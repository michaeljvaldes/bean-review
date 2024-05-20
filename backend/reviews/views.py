from django.contrib.auth.models import User
from rest_framework import filters, viewsets
from reviews.models import Review, Roaster
from reviews.serializers import (ReviewSerializer, RoasterSerializer,
                                 UserSerializer)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RoasterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Roaster.objects.all()
    serializer_class = RoasterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
