import uuid

from django.db import models


class Coffee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    roaster = models.CharField(max_length=100)
    year = models.IntegerField()
    origin = models.TextField(max_length=20)
    # process descriptors
    # tasting note descriptors


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rating = models.SmallIntegerField()
    notes = models.TextField()
    # tasting note descriptors
    # owner
    coffee = models.ForeignKey(
        Coffee, related_name='coffee', on_delete=models.CASCADE)
