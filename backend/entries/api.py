import sys
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(project_root))


from datetime import date
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import JournalEntry, Recommendation
from .serializers import (
    JournalEntrySummarySerializer,
    JournalEntryDetailSerializer
)

from ai.recommendations import build_recommendations


User = get_user_model()
HARDCODED_USERNAME = 'sayangtist' #My local username

def get_current_user(request):
    if settings.DEBUG:
        return User.objects.get(username=HARDCODED_USERNAME)
    return request.user

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def entries_list_create(request):
    user = get_current_user(request)

    if request.method == 'GET':
        qs = JournalEntry.objects.filter(user=user).order_by('-entry_date')
        return Response(JournalEntrySummarySerializer(qs, many=True).data)

    # POST branch
    title    = request.data.get('title', '').strip()
    content  = request.data.get('content', '').strip()
    raw_date = request.data.get('entry_date')

    if not title:
        return Response({'error': 'Title is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not content:
        return Response({'error': 'Content is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # parse date…
    if raw_date:
        try:
            entry_date = date.fromisoformat(raw_date)
        except ValueError:
            return Response({'error': 'Invalid date format.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        entry_date = timezone.now().date()

    entry = JournalEntry.objects.create(
        user=user,
        entry_date=entry_date,
        title=title,
        content=content
    )

    try:
        recommendations_data = build_recommendations(content)

        for theme_data in recommendations_data[0]['recommendations']:
            theme = theme_data['theme']
            for track in theme_data['tracks']:
                Recommendation.objects.create(
                    entry=entry,
                    service="lastfm",
                    rec_type="track",
                    rec_id=track["url"].split("/")[-1],
                    rec_name=track["name"],
                    artist=track["artist"],
                    metadata={
                        "image_url": track["image"],
                        "url": track["url"],
                        "theme": theme
                    }
                )
    except Exception as e:
        print(f"Error generating recommendations: {e}")
            

    return Response(JournalEntrySummarySerializer(entry).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def retrieve_entry(request, pk):
    user = get_current_user(request)
    try:
        entry = JournalEntry.objects.get(pk=pk, user=user)
    except JournalEntry.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    return Response(JournalEntryDetailSerializer(entry).data)
