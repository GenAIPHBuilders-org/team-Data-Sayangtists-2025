from datetime import date
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import JournalEntry
from .serializers import (
    JournalEntrySummarySerializer,
    JournalEntryDetailSerializer
)

User = get_user_model()
HARCODED_USERNAME = 'shaun'

@api_view(['GET', 'POST'])
@permission_classes([])
def entries_list_create(request):
    actual_user = request.user
    
    if settings.DEBUG and HARCODED_USERNAME:
        try:
            hardcoded_user = User.objects.get(username=HARCODED_USERNAME)
            request.user = hardcoded_user
            print(f"Using hardcoded user: {request.user.username}")
        except User.DoesNotExist:
            return Response(
                {'error': f'Hardcoded user "{HARCODED_USERNAME}" not found.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    elif not request.user or not request.user.is_authenticated:
        return Response({'error': 'Authentication credentials were not provided.'},
                        status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'GET':
        qs = JournalEntry.objects.filter(user=request.user).order_by('-entry_date')
        data = JournalEntrySummarySerializer(qs, many=True).data
        return Response(data)

    # POST
    title    = request.data.get('title', '').strip()
    content  = request.data.get('content', '').strip()
    raw_date = request.data.get('entry_date')

    if not title:
        return Response({'error': 'Title is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not content:
        return Response({'error': 'Content is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # parse entry_date as before…
    if raw_date:
        try:
            entry_date = date.fromisoformat(raw_date)
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        entry_date = timezone.now().date()

    entry = JournalEntry.objects.create(
        user=request.user,
        entry_date=entry_date,
        title=title,              # save the title
        content=content
    )

    serializer = JournalEntrySummarySerializer(entry)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([])
def retrieve_entry(request, pk):
    """
    Return full detail (content, analysis, recommendations) for one entry.
    """
    actual_user = request.user

    if settings.DEBUG and HARDCODED_USERNAME: # Only in DEBUG mode!
        try:
            hardcoded_user = User.objects.get(username=HARDCODED_USERNAME)
            request.user = hardcoded_user
            print(f"DEBUG: Using hardcoded user: {request.user.username}")
        except User.DoesNotExist:
            return Response(
                {'error': f'Hardcoded user "{HARDCODED_USERNAME}" not found.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    elif not request.user or not request.user.is_authenticated:
        return Response({'error': 'Authentication credentials were not provided.'},
                        status=status.HTTP_401_UNAUTHORIZED)
    # --- End hard-coding section ---

    try:
        entry = JournalEntry.objects.get(pk=pk, user=request.user)
    except JournalEntry.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JournalEntryDetailSerializer(entry)
    return Response(serializer.data)

