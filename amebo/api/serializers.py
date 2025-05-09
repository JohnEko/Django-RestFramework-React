from rest_framework import serializers 
from django.core import serializers as core_serializers
from .models import Post, Category, Comment, Property, User, Reservation, ConversationMessage, Conversation


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


class ReservationListSerializer(serializers.ModelSerializer):
    property = PropertiesSerializer(read_only=True, many=False)
    class Meta:
        model = Reservation
        fields =(
            'id', 'start_date', 'end_date', 'number_of_night', 'total_price', 'property'
        )


class ConversationListSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at',)


class ConservationDetailSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at',)


class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserDetailSerializer(many=False, read_only=True)
    created_by = UserDetailSerializer(many=False, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'body', 'sent_to', 'created_by',)

