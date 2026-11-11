from django.conf import settings
from django.db.models import Count, Prefetch, Q
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Contribution, Ingredient, Product, ProductIngredient, Project
from .serializers import (
    IngredientSerializer,
    ProductDetailSerializer,
    ProductSummarySerializer,
    StatsSerializer,
)

MIN_QUERY_LENGTH = 2
MAX_POPULAR = 24


def _project_param(request: Request) -> str | None:
    project = request.query_params.get("project")
    if project is None or project == "":
        return None
    if project not in Project.values:
        raise ValidationError({"project": f"Valeurs possibles : {', '.join(Project.values)}."})
    return project


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Produits (lecture seule).

    - `GET /api/products/?project=food`
    - `GET /api/products/{barcode}/`
    - `GET /api/products/search/?q=…&project=…`
    - `GET /api/products/popular/?project=…&limit=…`
    """

    lookup_field = "barcode"

    def get_queryset(self):
        qs = Product.objects.all()
        project = _project_param(self.request)
        if project:
            qs = qs.filter(project=project)
        if self.action == "retrieve":
            qs = qs.prefetch_related(
                Prefetch("composition", queryset=ProductIngredient.objects.select_related("ingredient"))
            )
        return qs

    def get_serializer_class(self):
        return ProductDetailSerializer if self.action == "retrieve" else ProductSummarySerializer

    @action(detail=False)
    def search(self, request: Request) -> Response:
        q = request.query_params.get("q", "").strip()
        if len(q) < MIN_QUERY_LENGTH:
            raise ValidationError({"q": f"Au moins {MIN_QUERY_LENGTH} caractères."})
        qs = self.get_queryset().filter(Q(name__icontains=q) | Q(brand__icontains=q) | Q(barcode=q))
        qs = qs.order_by("-view_count", "name")
        page = self.paginate_queryset(qs)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=False)
    def popular(self, request: Request) -> Response:
        try:
            limit = min(max(int(request.query_params.get("limit", 6)), 1), MAX_POPULAR)
        except ValueError as exc:
            raise ValidationError({"limit": "Entier attendu."}) from exc
        qs = self.get_queryset().order_by("-view_count", "name")[:limit]
        return Response(self.get_serializer(qs, many=True).data)


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    """Fiches ingrédients et additifs, avec verdict, origine et source."""

    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    lookup_field = "slug"


@method_decorator(cache_page(settings.STATS_CACHE_SECONDS), name="get")
class StatsView(APIView):
    """Chiffres clés affichés sur la landing (mis en cache)."""

    def get(self, request: Request) -> Response:
        counts = Product.objects.aggregate(
            food=Count("id", filter=Q(project=Project.FOOD)),
            beauty=Count("id", filter=Q(project=Project.BEAUTY)),
            total=Count("id"),
        )
        data = {
            "products": counts,
            "ingredients": Ingredient.objects.count(),
            "contributors": Contribution.objects.values("contributor").distinct().count(),
            "updated_at": timezone.now(),
        }
        return Response(StatsSerializer(data).data)
