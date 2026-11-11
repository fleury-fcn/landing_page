from django.contrib import admin

from .models import Contribution, Ingredient, Product, ProductIngredient


class ProductIngredientInline(admin.TabularInline):
    model = ProductIngredient
    extra = 1
    autocomplete_fields = ["ingredient"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "brand", "barcode", "project", "verdict", "view_count"]
    list_filter = ["project", "verdict"]
    search_fields = ["name", "brand", "barcode"]
    inlines = [ProductIngredientInline]
    readonly_fields = ["verdict"]

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        form.instance.refresh_verdict()


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ["name", "code", "verdict"]
    list_filter = ["verdict"]
    search_fields = ["name", "code"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ["kind", "contributor", "product", "created_at"]
    list_filter = ["kind"]
