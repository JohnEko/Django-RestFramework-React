from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.tokens import AccessToken
from .models import Category, Post, Comment, Property, Reservation, User, Conversation, ConversationMessage
from .forms import PostForm, PropertyForm
from .serializers import PropertiesSerializer, PropertyDetailSerializer, ReservationListSerializer, UserDetailSerializer, ConversationListSerializer, ConservationDetailSerializer, ConversationMessageSerializer

# Create your views here.



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    # Check Authentications
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken[token]
        user_id =token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None

    favorites = []
    properties = Property.objects.all()

    # Filterget landlord id
    is_favorites = request.GET.get('is_favorites', '')
    landlord_id = request.GET.get('landlord_id', '')

    # CREATING A SEARCH FUNCTIONALITY TO STORE THE FRONTEND 
    country = request.GET.get('country')
    category = request.GET.get('category')
    checkin_date = request.GET.get('checkIn')
    checkout_date = request.GET.get('checkOut')
    bedrooms = request.GET.get('bedrooms')
    guests = request.GET.get('guests')
    bathrooms = request.GET.get('bathrooms')


    if checkin_date and checkout_date:
        exact_matches = Reservation.objects.filter(start_date=checkin_date) | Reservation.objects.filter(end_date=checkout_date)
        overlap_matches = Reservation.objects.filter(start_date__lte=checkout_date, end_date__gte=checkin_date)
# let create a list and loop through it to get the reservation id
        all_matches = []

        for reservation in exact_matches | overlap_matches:
            all_matches.append(reservation.property.id)
# if the property we looking for is exat matches we exclude it from the results
        properties = properties.exclude(id__in=all_matches)

# filtering the details from the user input to get the search
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)

# this will go to the backend and check the many to many field and return to the user
    if is_favorites:
        properties = properties.filter(favorited__in=[user])

    if guests:
        properties = properties.filter(guests__gte=guests)

    if bedrooms:
        properties = properties.filter(bedrooms__gte=bedrooms)

    if bathrooms:
        properties = properties.filter(bathrooms__gte=bathrooms)

    if country:
        properties = properties.filter(country=country)

    if category and category != 'undefined':
        properties = properties.filter(category=category)

    # Favorites user apartment or news atlets
    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)

    serializer = PropertiesSerializer(properties, many=True)
    return JsonResponse({'data' : serializer.data,
                         'favorites' : favorites})



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_detail(request, pk):
    properties = Property.objects.get(pk=pk)

    landlord_id = request.GET.get('landlord_id', '')

# filtering the loadlord by there id
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)



    serializer = PropertyDetailSerializer(properties, many=False)

    return JsonResponse(serializer.data)


# creating a reservation for guest
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservation(request, pk):
    propertys = Property.objects.get(pk=pk)
    reservations = propertys.reservations.all()

    serializer = ReservationListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'FILES'])
def create_property(request):
    # I need to add the model here so form can get the property
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        propertys=form.save(commit=False)
        # let check if user is authenticate
        propertys.landlord = request.user
        propertys.save()

        return JsonResponse({'success' : True})
    
    else:
        print('Error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
        

# this suppose to be in useraccount app
@api_view(['POST'])
def book_property(request, pk):
    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_night = request.POST.get('number_of_night', '')
        total_price = request.POST.get('total_price', '')
        guests = request.POST.get('guests', '')

        propertys = Property.objects.get(pk=pk)

        Reservation.objects.create(
            property=propertys,
            start_date=start_date,
            number_of_night=number_of_night,
            end_date=end_date,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )
        return JsonResponse({'success': True})

    except Exception as e:
        print('Error', e)

        return JsonResponse({'success': False})

@api_view(['POST'])   
def toggle_favorite(request, pk):
    properties = Property.objects.get(pk=pk)

    if request.user in properties.favourited.all():
        properties.favourited.remove(request.user)

        return JsonResponse({'is_favorite' : False})
    
    else:
        properties.favourited.add(request.user)

        return JsonResponse({'is_favorite': True})



# this below code suppose to be in useraccount app
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    user = User.objects.get(pk=pk)

    serializer = UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def reservation_list(request):
    reservations = request.user.reservation.all()

    serializer =UserDetailSerializer(reservations, many=False)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def conversation_list(request):
    serializer = ConversationListSerializer(request.user.conversation.all(), many=True)

    return JsonResponse(serializer.data, safe=False)



@api_view(['GET'])
def conversation_details(request, pk):
    conversation = request.user.conversation.get(pk=pk)

    conversation_serializer = ConservationDetailSerializer(conversation, many=False)
    message_serializer = ConversationMessageSerializer(conversation.messages.all(), many=True)

    return JsonResponse({
        'conversation' : conversation_serializer.data,
        'messages': message_serializer.data
    }, safe=False)



@api_view(['GET'])
def conversation_start(request, user_id):
    # filter the conversation i am in
    conversations = Conversation.objects.filter(user__in=[user_id]).filter(user__in=[request.user.id])

    # get the all conversation incase there are no conversation
    if conversations.count() > 0:
        conversation = conversations.first()

        return JsonResponse({'success': True, 'conversation_id': conversation.id})
    
    else:
        user = User.objects.get(pk=user_id)
        conversation = Conversation.objects.create()
        conversation.user.aadd(request.user)
        conversation.user.add(user)

        return JsonResponse({'success': True, 'conversation_id': conversation.id})