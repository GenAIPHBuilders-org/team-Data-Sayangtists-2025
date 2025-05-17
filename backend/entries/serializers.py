from rest_framework import serializers
from .models import JournalEntry, EntryAnalysis, Recommendation

class JournalEntrySummarySerializer(serializers.ModelSerializer):
    snippet = serializers.SerializerMethodField()
    date    = serializers.DateField(source='entry_date', format="%b %d, %Y")

    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'snippet', 'date']

    def get_snippet(self, obj):
        return obj.content[:30] + '...'


class EntryAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryAnalysis
        fields = ['sentiment', 'sentiment_score', 'themes']


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ['service', 'rec_type', 'rec_id', 'rec_name']


class JournalEntryDetailSerializer(serializers.ModelSerializer):
    analysis = EntryAnalysisSerializer(read_only=True)
    recommendations = RecommendationSerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'entry_date', 'title', 'content', 'analysis', 'recommendations']