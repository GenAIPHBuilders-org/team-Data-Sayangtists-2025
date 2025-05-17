"""
URL configuration for journal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path
from entries.api import entries_list_create, retrieve_entry

urlpatterns = [
    path("", lambda req: redirect("api/entries/")),
    path("admin/", admin.site.urls),
    path("api/entries/", entries_list_create, name="entries-list-create"),
    path("api/entries/<uuid:pk>/", retrieve_entry, name="entry-detail"),
]