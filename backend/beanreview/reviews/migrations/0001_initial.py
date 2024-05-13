# Generated by Django 4.2.13 on 2024-05-13 22:51

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coffee',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('roaster', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('origin', models.TextField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('rating', models.SmallIntegerField()),
                ('notes', models.TextField()),
                ('coffee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coffee', to='reviews.coffee')),
            ],
        ),
    ]
