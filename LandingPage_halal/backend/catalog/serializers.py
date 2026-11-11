from rest_framework import serializers

from .models import Ingredient, Product


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["slug", "name", "code", "verdict", "origin", "source", "schools_note"]


class ProductSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["barcode", "name", "brand", "project", "verdict", "image_url"]


class ProductDetailSerializer(ProductSummarySerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta(ProductSummarySerializer.Meta):
        fields = [*ProductSummarySerializer.Meta.fields, "ingredients", "updated_at"]

    def get_ingredients(self, obj: Product) -> list[dict]:
        ordered = [link.ingredient for link in obj.composition.all()]
        return IngredientSerializer(ordered, many=True).data


class ProductCountsSerializer(serializers.Serializer):
    food = serializers.IntegerField()
    beauty = serializers.IntegerField()
    total = serializers.IntegerField()


class StatsSerializer(serializers.Serializer):
    products = ProductCountsSerializer()
    ingredients = serializers.IntegerField()
    contributors = serializers.IntegerField()
    updated_at = serializers.DateTimeField()
