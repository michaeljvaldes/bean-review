from django.contrib.auth.models import User
from rest_framework import serializers
from reviews.models import Review, Roaster


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'reviews']


class RoasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roaster
        fields = ['id', 'name', 'website']


class RoasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roaster
        fields = ['id', 'name', 'website']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'notes', 'coffee', 'owner']
