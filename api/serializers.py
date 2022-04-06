from dataclasses import fields
from rest_framework import serializers
from bookquest.models import Book, Author , Subject


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title','isbn','author','subject')

class NestedAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['author']

class AuthorSerializer(serializers.ModelSerializer):
    author_name = NestedAuthorSerializer(many=True, source='bookquest', read_only=True)
    class Meta:
        model = Author
        fields = ('author')


class NestedSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['subject']

class SubjectSerializer(serializers.ModelSerializer):
    author_name = NestedSubjectSerializer(many=True, source='bookquest', read_only=True)
    class Meta:
        model = Subject
        fields = ('subject', 'author_name')