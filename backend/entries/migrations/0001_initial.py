# Generated by Django 5.2.1 on 2025-05-24 08:22

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='JournalEntry',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('entry_date', models.DateField()),
                ('title', models.CharField(blank=True, default='', max_length=256)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entries', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EntryAnalysis',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('sentiment', models.CharField(max_length=32)),
                ('sentiment_score', models.FloatField()),
                ('themes', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('entry', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='analysis', to='entries.journalentry')),
            ],
        ),
        migrations.CreateModel(
            name='Recommendation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('service', models.CharField(max_length=64)),
                ('rec_type', models.CharField(max_length=32)),
                ('rec_id', models.CharField(max_length=128)),
                ('rec_name', models.CharField(max_length=256)),
                ('artist', models.CharField(max_length=256)),
                ('metadata', models.JSONField()),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recommendations', to='entries.journalentry')),
            ],
        ),
        migrations.CreateModel(
            name='UserToken',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('service', models.CharField(max_length=64)),
                ('access_token', models.CharField(max_length=512)),
                ('refresh_token', models.CharField(max_length=512)),
                ('expires_at', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tokens', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
