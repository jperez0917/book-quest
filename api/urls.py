from rest_framework.routers import DefaultRouter

from api.views import BookViewSet 

router = DefaultRouter()
router.register('books', BookViewSet, basename='books')

#you can enter additional urls below inside the list.
urlpatterns = router.urls + [ 
    
]

