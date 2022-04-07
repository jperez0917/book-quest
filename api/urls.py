from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

from api.views import BookViewSet, AuthorViewSet, SubjectViewSet

router = DefaultRouter()
router.register('books', BookViewSet, basename='books')
router.register('author', AuthorViewSet, basename='author')
router.register('subject', SubjectViewSet, basename='subject')
# router.register('user', BookViewSet, basename='books')

#you can enter additional urls below inside the list.
urlpatterns = router.urls + [ 
    #  path('currentuser/', views.CurrentUserView.as_view())
]

