from core.exceptions import GenericErrorException
from core.models import Item
from core.serializers import ItemSerializer
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


class ItemListAPIView(ListAPIView):
    """
    Lists all the items of the `TODO` application.
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.order_by("edited")


class ItemAPIView(GenericAPIView):
    """
    Used for simple `CRUD` operations
    and can be modiefied as you see fit.
    """

    serializer_class = ItemSerializer

    def get(self, request, id, *args, **kwargs):
        try:
            item = Item.objects.get(pk=id)
        except Item.DoesNotExist:
            raise GenericErrorException(detail=f"Item '{id}' not found.")

        serializer_data = self.serializer_class(item)
        return Response(serializer_data.data)

    def put(self, request, id):
        try:
            item = Item.objects.get(pk=id)
        except Item.DoesNotExist:
            raise GenericErrorException(detail=f"Item '{id}' not found.")

        serializer_data = self.serializer_class(instance=item, data=request.data)
        serializer_data.is_valid(raise_exception=True)
        instance = serializer_data.save()
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    def delete(self, request, id):
        try:
            item = Item.objects.get(pk=id)
        except Item.DoesNotExist:
            raise GenericErrorException(detail=f"Item '{id}' not found.")
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateItemAPIView(CreateAPIView):

    serializer_class = ItemSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        item = serializer.save()
        item_data = self.serializer_class(item)
        return Response(item_data.data, status=status.HTTP_201_CREATED)


class DuplicateAPIView(APIView):
    """
    View that duplicates an item and returns an exact copy
    of the same.

    This API can and should be updated.

    Tip: Maybe the duplicate function should be placed somewhere else?
    """

    body = ItemSerializer

    def duplicate(self, id):
        try:
            item = Item.objects.get(pk=id)
        except Item.DoesNotExist:
            raise GenericErrorException(detail=f"Item '{id}' not found.")

        item.id = None
        item.save()
        return item

    def post(self, request, id):
        item = self.duplicate(id=id)
        serializer = self.body(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
