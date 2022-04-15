from rest_framework import serializers
from bookquest.models import Book, Author , Subject
from django.contrib.auth import get_user_model


class NestedAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('author',)

class NestedSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('subject',)


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title','isbn','user', 'id')

class AuthorSerializer(serializers.ModelSerializer):
    # author_name = NestedSubjectSerializer(many=True, source='subject', read_only=True)
    class Meta:
        model = Author
        fields = ('author',)


class SubjectSerializer(serializers.ModelSerializer):
    author_name = NestedAuthorSerializer(many=True, source='author', read_only=True)
    class Meta:
        model = Subject
        fields = ('subject', 'author_name')

class UserSerializer(serializers.ModelSerializer):
    books_detail = BookSerializer(many=True, read_only=True, source='books')
    class Meta: 
        model = get_user_model()
        fields = ('id', 'username', 'books_detail')