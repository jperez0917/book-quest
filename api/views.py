from rest_framework import viewsets, generics

from bookquest.models import Book 
from api.serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()

    serializer_class = BookSerializer


# class SaveBookViewSet(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Book.objects.all()

