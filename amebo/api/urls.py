from django.urls import path
from . import api



urlpatterns = [
    path('', api.property_list, name='api_properties_list')
    # path('home/', views.HomListAPIViews.as_view(), name='home'),
    # path('news/<slug:slug>/', views.NewsDetailAPIView.as_view(), name='news'),
    # path('create/', views.PostToCreateAPIView.as_view(), name='create'),
    # path('update/<slug:slug>/', views.NewsToUpdateAPIView.as_view(), name='update'),

]
