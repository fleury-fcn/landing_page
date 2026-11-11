from django.db import models


class Project(models.TextChoices):
    FOOD = "food", "Halal Open Food Facts"
    BEAUTY = "beauty", "Halal Open Beauty Facts"


class Verdict(models.TextChoices):
    HALAL = "halal", "Halal"
    DOUBTFUL = "doubtful", "Douteux"
    HARAM = "haram", "Haram"
    UNKNOWN = "unknown", "Inconnu"


# Ordre de prudence : le statut d'un produit est le plus sévère de ses ingrédients.
VERDICT_SEVERITY = {Verdict.HALAL: 0, Verdict.UNKNOWN: 1, Verdict.DOUBTFUL: 2, Verdict.HARAM: 3}


def overall_verdict(verdicts: list[str]) -> str:
    if not verdicts:
        return Verdict.UNKNOWN
    return max(verdicts, key=lambda v: VERDICT_SEVERITY[Verdict(v)])


class Ingredient(models.Model):
    """Fiche documentée d'un ingrédient ou additif, avec la source de son verdict."""

    slug = models.SlugField(max_length=120, unique=True)
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=60, blank=True, help_text="E-numéro, INCI ou Colour Index.")
    verdict = models.CharField(max_length=10, choices=Verdict.choices, default=Verdict.UNKNOWN)
    origin = models.TextField(blank=True)
    source = models.TextField(blank=True, help_text="Référence justifiant le verdict.")
    schools_note = models.TextField(blank=True, help_text="Divergences entre écoles, le cas échéant.")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.code})" if self.code else self.name


class Product(models.Model):
    barcode = models.CharField(max_length=32, unique=True)
    project = models.CharField(max_length=10, choices=Project.choices, db_index=True)
    name = models.CharField(max_length=200, db_index=True)
    brand = models.CharField(max_length=120, blank=True, db_index=True)
    image_url = models.URLField(blank=True)
    ingredients = models.ManyToManyField(Ingredient, through="ProductIngredient", related_name="products")
    verdict = models.CharField(max_length=10, choices=Verdict.choices, default=Verdict.UNKNOWN, db_index=True)
    view_count = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} [{self.barcode}]"

    def refresh_verdict(self, save: bool = True) -> str:
        self.verdict = overall_verdict(list(self.ingredients.values_list("verdict", flat=True)))
        if save:
            self.save(update_fields=["verdict", "updated_at"])
        return self.verdict


class ProductIngredient(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="composition")
    ingredient = models.ForeignKey(Ingredient, on_delete=models.PROTECT)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["position"]
        constraints = [
            models.UniqueConstraint(fields=["product", "ingredient"], name="unique_product_ingredient")
        ]

    def __str__(self) -> str:
        return f"{self.product_id} · {self.ingredient}"


class Contribution(models.Model):
    class Kind(models.TextChoices):
        ADD = "add", "Ajout de produit"
        EDIT = "edit", "Modification"
        REPORT = "report", "Signalement"

    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, blank=True, related_name="contributions"
    )
    kind = models.CharField(max_length=10, choices=Kind.choices)
    contributor = models.CharField(max_length=80, help_text="Pseudonyme public.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.get_kind_display()} par {self.contributor}"
