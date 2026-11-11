from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import IngredientViewSet, ProductViewSet, StatsView

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("ingredients", IngredientViewSet, basename="ingredient")

urlpatterns = [
    path("stats/", StatsView.as_view(), name="stats"),
    *router.urls,
]
