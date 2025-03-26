from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.tokens import AccessToken
from .models import Category, Post, Comment, Property, Reservation, User 
from .forms import PostForm, PropertyForm
from .serializers import PropertiesSerializer, PropertyDetailSerializer, ReservationListSerializer, UserDetailSerializer, ConversationListSerializer, ConservationDetailSerializer

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

    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)

# this will go to the backend and check the many to many field and return to the user
    if is_favorites:
        properties = properties.filter(favorited__in=[user])
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
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConservationDetailSerializer(conversation, many=False)

    return JsonResponse({
        'conversation' : conversation_serializer.data
    }, safe=False)








# # class HomListAPIViews(generics.ListAPIView):
# #     serializer_class = PostSerializer

# #     def get_queryset(self):
# #         post = Post.objects.all()
        
# #         return(post)
    
# # class NewsDetailAPIView(generics.GenericAPIView):

# #     serializer_class=PostSerializer

# #     def get(self, request, slug):
# #         post=Post.objects.filter(slug=slug).first()
# #         serializer = self.serializer_class(post)

# #         if serializer:
# #             return Response(serializer.data)
# #         return Response("Not Found", status=status.HTTP_404_NOT_FOUND)
    

# # class PostToCreateAPIView(generics.CreateAPIView):

# #     serializer_class = PostSerializer

# #     def get_queryset(self):
# #         serializer =self.serializer_class
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data, status=status.HTTP_201_Created)
# #         return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


# # class NewsToUpdateAPIView(generics.UpdateAPIView):
# #     serializer_class = PostSerializer
   
# #     def perform_update(self, request, pk):
# #         post=Post.objects.filter(id=pk).first()
# #         serializer = self.serializer_class(post)
        
# #         if serializer.is_valid:
# #             serializer.save()
           
# #             return Response(serializer, status=status.HTTP_200_OK)
# #         return Response(serializer.error, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
    