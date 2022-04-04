from django.urls import path
from . import views

app_name = 'bookquest' 
urlpatterns = [
    path('', views.index, name='index'),
    
]