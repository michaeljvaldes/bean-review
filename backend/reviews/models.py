import uuid

from django.db import models


class Roaster(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    website = models.CharField(max_length=50)
    # owner


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    origin = models.TextField(max_length=20)
    rating = models.SmallIntegerField()
    notes = models.TextField()
    # tasting note descriptors
    roaster = models.ForeignKey(
        Roaster, related_name='coffees', on_delete=models.CASCADE)
    owner = models.ForeignKey(
        'auth.user', related_name='reviews', on_delete=models.CASCADE)
