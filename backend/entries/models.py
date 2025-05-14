from django.db import models

# Create your models here.
import uuid
from django.db import models
from django.contrib.auth.models import User

class JournalEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="entries")
    entry_date = models.DateField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class EntryAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entry = models.OneToOneField(JournalEntry, on_delete=models.CASCADE, related_name="analysis")
    sentiment = models.CharField(max_length=32)
    sentiment_score = models.FloatField()
    themes = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

class Recommendation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="recommendations")
    service = models.CharField(max_length=64)
    rec_type = models.CharField(max_length=32)
    rec_id = models.CharField(max_length=128)
    rec_name = models.CharField(max_length=256)
    rationale = models.TextField()
    metadata = models.JSONField()
    recommended_at = models.DateTimeField(auto_now_add=True)

class UserToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tokens")
    service = models.CharField(max_length=64)
    access_token = models.CharField(max_length=512)
    refresh_token = models.CharField(max_length=512)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)