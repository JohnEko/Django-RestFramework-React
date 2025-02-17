# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework import generics, status
# # from .models import Category, Post, Comment
# from .serializers import PostSerializer, CategorySerializer, CommentSerializer

# # Create your views here.



# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def home_list(request):
#     post =Post.objects.all()
#     serializer = PostSerializer(post, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


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
    
    
    