from email.mime import image
from operator import mod
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=300)
    isbn = models.CharField(max_length=500)
    


    def __str__(self):
        return self.title


class Author(models.Model):
    book = models.ManyToManyField(Book, related_name='author')
    author = models.CharField(max_length=300)


class Subject(models.Model):
    subject = models.CharField(max_length=300)
    book = models.ManyToManyField(Book, related_name='subject')
