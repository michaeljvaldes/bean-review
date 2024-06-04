from django.contrib.auth import login
from django.contrib.auth.models import User
from knox.views import LoginView as KnoxLoginView
from rest_framework import filters, mixins, permissions, viewsets
from rest_framework.authtoken.serializers import AuthTokenSerializer
from reviews.models import Review, Roaster
from reviews.serializers import (ReviewSerializer, RoasterSerializer,
                                 UserSerializer)
from reviews.permissions import IsSelf


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer


class AuthUserViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [IsSelf]


class RoasterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Roaster.objects.all().order_by('name')
    serializer_class = RoasterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)
