from core.views import CreateItemAPIView, DuplicateAPIView, ItemAPIView, ItemListAPIView
from django.urls import path

urlpatterns = [
    path("", ItemListAPIView.as_view(), name="list"),
    path("<str:id>", ItemAPIView.as_view(), name="item"),
    path("create/item", CreateItemAPIView.as_view(), name="create-item"),
    path("duplicate/<str:id>", DuplicateAPIView.as_view(), name="duplicate"),
]
