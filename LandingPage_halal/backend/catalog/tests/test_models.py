from django.test import TestCase

from catalog.models import Ingredient, Product, ProductIngredient, Project, Verdict, overall_verdict


class OverallVerdictTests(TestCase):
    def test_most_severe_wins(self):
        self.assertEqual(overall_verdict(["halal", "doubtful"]), Verdict.DOUBTFUL)
        self.assertEqual(overall_verdict(["halal", "haram", "doubtful"]), Verdict.HARAM)
        self.assertEqual(overall_verdict(["halal", "unknown"]), Verdict.UNKNOWN)
        self.assertEqual(overall_verdict(["halal"]), Verdict.HALAL)

    def test_empty_is_unknown(self):
        self.assertEqual(overall_verdict([]), Verdict.UNKNOWN)

    def test_product_refresh_verdict(self):
        product = Product.objects.create(barcode="1", project=Project.FOOD, name="Test")
        for i, (slug, verdict) in enumerate([("a", Verdict.HALAL), ("b", Verdict.DOUBTFUL)]):
            ing = Ingredient.objects.create(slug=slug, name=slug, verdict=verdict)
            ProductIngredient.objects.create(product=product, ingredient=ing, position=i)
        self.assertEqual(product.refresh_verdict(), Verdict.DOUBTFUL)
        product.refresh_from_db()
        self.assertEqual(product.verdict, Verdict.DOUBTFUL)
