from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
# from dj_rest_auth import LoginView, LogoutView, UserdetailsView
from rest_framework_simplejwt.views import TokenVerifyView

from . import api



urlpatterns = [
    # This can be created in useraccount app for bigger projects
    # The above url.py are for useraccount app and below for api account app
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('auth/<uuid:pk>/', api.landlord_detail, name='api_landlord_detail'),
    path('auth/myreservations/', api.reservation_list, name='api_reservation_details'),
     

    path('properties/', api.property_list, name='api_properties_list'),
    path('properties/create/', api.create_property, name='api_ctreate_property'),
    path('properties/<uuid:pk>/', api.property_detail, name='api_property_detail'),
    path('properties/<uuid:pk>/book/', api.book_property, name='api_book_property'),
    path('properties/<uuid:pk>/reservations/', api.property_reservation, name='api_property_reservation'),



]
