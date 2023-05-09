from django.urls import path
from sw import views
urlpatterns = [
    path('getinfo/',views.getinfo),
    path('fileup/',views.file_up),
    path('download/',views.file_download),
    path('',views.index)
    
]