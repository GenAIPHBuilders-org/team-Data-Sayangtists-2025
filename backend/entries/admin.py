from django.contrib import admin

# Register your models here.
from .models import JournalEntry, EntryAnalysis, Recommendation, UserToken

@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'entry_date', 'created_at')
    list_filter = ('entry_date', 'user')
    search_fields = ('content',)

@admin.register(EntryAnalysis)
class EntryAnalysisAdmin(admin.ModelAdmin):
    list_display = ('entry', 'sentiment', 'sentiment_score', 'created_at')
    search_fields = ('entry__content',)

@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ("id", "rec_name", "artist", "entry")
    list_filter = ('service', 'rec_type')

@admin.register(UserToken)
class UserTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'expires_at')
    list_filter = ('service',)
