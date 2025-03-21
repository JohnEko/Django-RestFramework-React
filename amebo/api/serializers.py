from rest_framework import serializers 
from django.core import serializers as core_serializers
from .models import Post, Category, Comment, Property, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'author','content', 'participants','image', 'created_at', 'updated_at', 'category', 'views')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        # filds = ["id", "title", "content", "published_date"]


class PropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields =  ('id', 'title', 'description','price_per_night', 'image','bedrooms', 'bathrooms', 'guests', 'landlord')

# Propertydetailserializer inherite from userdetail so we can get the landlord
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'avatar_url')


class PropertyDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = Property
        fields = ('id', 'title', 'description','price_per_night', 'image','bedrooms', 'bathrooms', 'guests', 'landlord')



