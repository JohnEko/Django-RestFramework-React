from django.urls import path
from . import views



urlpatterns = [
    path('home/', views.HomListAPIViews.as_view(), name='home'),
    path('news/<slug:slug>/', views.NewsDetailAPIView.as_view(), name='news'),
    path('create/', views.PostToCreateAPIView.as_view(), name='create'),
    path('update/<slug:slug>/', views.NewsToUpdateAPIView.as_view(), name='update'),



]
