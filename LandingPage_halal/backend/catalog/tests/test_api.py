from django.core.cache import cache
from django.core.management import call_command
from django.test import override_settings
from rest_framework.test import APITestCase


class ApiTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        call_command("seed_demo", stdout=open("/dev/null", "w"))  # noqa: SIM115

    def setUp(self):
        cache.clear()


class StatsTests(ApiTestCase):
    def test_stats_shape(self):
        res = self.client.get("/api/stats/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        self.assertEqual(body["products"], {"food": 3, "beauty": 3, "total": 6})
        self.assertEqual(body["ingredients"], 11)
        self.assertGreater(body["contributors"], 0)
        self.assertIn("updated_at", body)


class SearchTests(ApiTestCase):
    def test_requires_two_characters(self):
        res = self.client.get("/api/products/search/", {"q": "a"})
        self.assertEqual(res.status_code, 400)
        self.assertIn("q", res.json())

    def test_matches_name_brand_and_barcode(self):
        self.assertEqual(self.client.get("/api/products/search/", {"q": "bonbons"}).json()["count"], 1)
        self.assertEqual(self.client.get("/api/products/search/", {"q": "autre marque"}).json()["count"], 2)
        res = self.client.get("/api/products/search/", {"q": "2000000000042"}).json()
        self.assertEqual(res["results"][0]["name"], "Rouge à lèvres satiné")

    def test_filters_by_project(self):
        res = self.client.get("/api/products/search/", {"q": "marque", "project": "beauty"}).json()
        self.assertTrue(res["count"] > 0)
        self.assertTrue(all(p["project"] == "beauty" for p in res["results"]))

    def test_rejects_unknown_project(self):
        res = self.client.get("/api/products/search/", {"q": "marque", "project": "cars"})
        self.assertEqual(res.status_code, 400)


class PopularTests(ApiTestCase):
    def test_ordered_by_views_and_limited(self):
        res = self.client.get("/api/products/popular/", {"limit": 2})
        self.assertEqual(res.status_code, 200)
        names = [p["name"] for p in res.json()]
        self.assertEqual(names, ["Bonbons gélifiés aux fruits", "Biscuits sablés"])

    def test_invalid_limit(self):
        self.assertEqual(self.client.get("/api/products/popular/", {"limit": "x"}).status_code, 400)


class ProductDetailTests(ApiTestCase):
    def test_detail_includes_ordered_ingredients_with_sources(self):
        res = self.client.get("/api/products/2000000000011/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        self.assertEqual(body["verdict"], "haram")
        self.assertEqual(body["ingredients"][0]["slug"], "sirop-glucose")
        self.assertTrue(all(i["source"] for i in body["ingredients"]))

    def test_unknown_barcode(self):
        self.assertEqual(self.client.get("/api/products/0000/").status_code, 404)


class ReadOnlyAndCorsTests(ApiTestCase):
    def test_api_is_read_only(self):
        self.assertEqual(self.client.post("/api/products/", {}).status_code, 405)

    @override_settings(CORS_ALLOWED_ORIGINS=["http://localhost:3000"])
    def test_cors_header_for_landing_origin(self):
        res = self.client.get("/api/stats/", HTTP_ORIGIN="http://localhost:3000")
        self.assertEqual(res["Access-Control-Allow-Origin"], "http://localhost:3000")

    @override_settings(CORS_ALLOWED_ORIGINS=["http://localhost:3000"])
    def test_no_cors_header_for_other_origin(self):
        res = self.client.get("/api/stats/", HTTP_ORIGIN="https://evil.example")
        self.assertNotIn("Access-Control-Allow-Origin", res)
