from rest_framework import viewsets

from bookquest.models import Book 
from api.serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()

    serializer_class = BookSerializer


