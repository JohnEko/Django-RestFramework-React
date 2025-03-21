from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
# from dj_rest_auth import LoginView, LogoutView, UserdetailsView
from rest_framework_simplejwt.views import TokenVerifyView

from . import api



urlpatterns = [
    # This can be created in useraccount app for bigger projects
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),

    path('properties/', api.property_list, name='api_properties_list'),
    path('properties/create/', api.create_property, name='api_ctreate_property'),
    path('properties/<uuid:pk>/', api.property_detail, name='api_property_detail'),

    # path('home/', views.HomListAPIViews.as_view(), name='home'),
    # path('news/<slug:slug>/', views.NewsDetailAPIView.as_view(), name='news'),
    # path('create/', views.PostToCreateAPIView.as_view(), name='create'),
    # path('update/<slug:slug>/', views.NewsToUpdateAPIView.as_view(), name='update'),

]
