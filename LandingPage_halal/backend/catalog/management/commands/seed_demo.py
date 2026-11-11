"""Données de démonstration (fictives) pour développer la landing en local."""

from django.core.management.base import BaseCommand
from django.db import transaction

from catalog.models import Contribution, Ingredient, Product, ProductIngredient, Project, Verdict

INGREDIENTS = [
    ("sirop-glucose", "Sirop de glucose", "", Verdict.HALAL, "Végétale (amidon).", "Fiche ingrédient.", ""),
    (
        "gelatine-porc",
        "Gélatine de porc",
        "",
        Verdict.HARAM,
        "Animale (porc).",
        "Coran, sourate Al-Baqara (2:173).",
        "",
    ),
    (
        "carmin",
        "Carmin",
        "E120",
        Verdict.DOUBTFUL,
        "Animale : cochenille (insecte).",
        "Fiche additif E120.",
        "Admis par une partie des savants (notamment malikites), non permis pour d'autres.",
    ),
    ("arome", "Arôme", "", Verdict.UNKNOWN, "Support non précisé.", "Information manquante.", ""),
    (
        "acide-citrique",
        "Acide citrique",
        "E330",
        Verdict.HALAL,
        "Fermentation de sucres végétaux.",
        "Fiche additif E330.",
        "",
    ),
    (
        "e471",
        "Mono- et diglycérides d'acides gras",
        "E471",
        Verdict.DOUBTFUL,
        "Végétale ou animale selon le fabricant.",
        "Fiche additif E471.",
        "",
    ),
    ("farine-ble", "Farine de blé", "", Verdict.HALAL, "Végétale.", "Fiche ingrédient.", ""),
    (
        "huile-ricin",
        "Huile de ricin",
        "Ricinus communis seed oil",
        Verdict.HALAL,
        "Végétale.",
        "Fiche ingrédient.",
        "",
    ),
    (
        "cire-abeille",
        "Cire d'abeille",
        "Cera alba",
        Verdict.HALAL,
        "Produite par les abeilles.",
        "Fiche ingrédient.",
        "",
    ),
    (
        "ci-75470",
        "Carmin",
        "CI 75470",
        Verdict.DOUBTFUL,
        "Animale : cochenille (insecte).",
        "Fiche CI 75470.",
        "Usage externe : avis partagés.",
    ),
    ("collagene-porcin", "Collagène porcin", "", Verdict.HARAM, "Animale (porc).", "Fiche ingrédient.", ""),
]

# Codes 2xxxxxxxxxxxx : plage réservée aux usages internes, donc sans collision avec de vrais produits.
PRODUCTS = [
    (
        "2000000000011",
        Project.FOOD,
        "Bonbons gélifiés aux fruits",
        "Marque exemple",
        420,
        ["sirop-glucose", "gelatine-porc", "carmin", "arome", "acide-citrique"],
    ),
    (
        "2000000000028",
        Project.FOOD,
        "Biscuits sablés",
        "Marque exemple",
        310,
        ["farine-ble", "e471", "arome"],
    ),
    ("2000000000035", Project.FOOD, "Galettes de blé", "Autre marque", 120, ["farine-ble"]),
    (
        "2000000000042",
        Project.BEAUTY,
        "Rouge à lèvres satiné",
        "Marque exemple",
        280,
        ["huile-ricin", "cire-abeille", "ci-75470"],
    ),
    ("2000000000059", Project.BEAUTY, "Baume à lèvres", "Autre marque", 95, ["huile-ricin", "cire-abeille"]),
    (
        "2000000000066",
        Project.BEAUTY,
        "Crème anti-âge au collagène",
        "Marque exemple",
        60,
        ["collagene-porcin", "huile-ricin"],
    ),
]

CONTRIBUTORS = ["amina", "yassine", "sarah", "karim", "fatou", "ibrahim", "lina"]


class Command(BaseCommand):
    help = "Insère des données de démonstration fictives (idempotent)."

    @transaction.atomic
    def handle(self, *args, **options) -> None:
        ingredients = {}
        for slug, name, code, verdict, origin, source, schools in INGREDIENTS:
            ingredients[slug], _ = Ingredient.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "code": code,
                    "verdict": verdict,
                    "origin": origin,
                    "source": source,
                    "schools_note": schools,
                },
            )
        for barcode, project, name, brand, views, composition in PRODUCTS:
            product, _ = Product.objects.update_or_create(
                barcode=barcode,
                defaults={"project": project, "name": name, "brand": brand, "view_count": views},
            )
            product.composition.all().delete()
            ProductIngredient.objects.bulk_create(
                ProductIngredient(product=product, ingredient=ingredients[slug], position=i)
                for i, slug in enumerate(composition)
            )
            product.refresh_verdict()
            if not product.contributions.exists():
                Contribution.objects.create(
                    product=product,
                    kind=Contribution.Kind.ADD,
                    contributor=CONTRIBUTORS[len(barcode + name) % len(CONTRIBUTORS)],
                )
        self.stdout.write(
            self.style.SUCCESS(f"{len(PRODUCTS)} produits et {len(INGREDIENTS)} ingrédients prêts.")
        )
