from datetime import date
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import JournalEntry
from .serializers import (
    JournalEntrySummarySerializer,
    JournalEntryDetailSerializer
)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def entries_list_create(request):
    if request.method == 'GET':
        qs = JournalEntry.objects.filter(user=request.user).order_by('-entry_date')
        data = JournalEntrySummarySerializer(qs, many=True).data
        return Response(data)

    # POST
    content = request.data.get('content', '').strip()
    raw_date = request.data.get('entry_date')
    if not content:
        return Response({'error': 'Content is required.'}, status=status.HTTP_400_BAD_REQUEST)

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
        content=content
    )
    serializer = JournalEntrySummarySerializer(entry)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_entry(request, pk):
    """
    Return full detail (content, analysis, recommendations) for one entry.
    """
    try:
        entry = JournalEntry.objects.get(pk=pk, user=request.user)
    except JournalEntry.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JournalEntryDetailSerializer(entry)
    return Response(serializer.data)

