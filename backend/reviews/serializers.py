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


class ReviewReadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    roaster = RoasterSerializer(many=False, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'name', 'year', 'origin',
                  'rating', 'notes', 'roaster', 'owner']


class ReviewWriteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    roaster = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Roaster.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'name', 'year', 'origin',
                  'rating', 'notes', 'roaster', 'owner']
        read_only_fields = ['id']
