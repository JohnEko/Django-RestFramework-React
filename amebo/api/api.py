from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import generics, status
from .models import Category, Post, Comment, Property, Reservation 
from .forms import PostForm, PropertyForm
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, PropertiesSerializer, PropertyDetailSerializer

# Create your views here.



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    properties = Property.objects.all()
    serializer = PropertiesSerializer(properties, many=True)
    return JsonResponse({'data' : serializer.data})



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_detail(request, pk):
    property = Property.objects.get(pk=pk)
    serializer = PropertyDetailSerializer(property, many=False)

    return JsonResponse(serializer.data)



@api_view(['POST', 'FILES'])
def create_property(request):
    # I need to add the model here so form can get the property
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        property=form.save(commit=False)
        # let check if user is authenticate
        property.landlord = request.user
        property.save()

        return JsonResponse({'success' : True})
    
    else:
        print('Error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)
        


@api_view(['POST'])
def book_property(request, pk):
    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_night = request.POST.get('number_of_night', '')
        total_price = request.POST.get('total_price', '')
        guests = request.POST.get('guests', '')

        property = Property.objects.get(pk=pk)

        Reservation.objects.create(
            property=property,
            start_date=start_date,
            number_of_night=number_of_night,
            end_date=end_date,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )

    except Exception as e:
        print('Error', e)

        return JsonResponse({'success': False})




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
    
    
    