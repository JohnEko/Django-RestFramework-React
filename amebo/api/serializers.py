# from rest_framework import serializers
# from .models import Post, Category, Comment


# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ('id', 
#                   'title', 
#                   'author',
#                   'content', 
#                   'participants',
#                   'image', 
#                   'created_at', 
#                   'updated_at', 
#                   'category', 
#                   'views')


#         def create(self, valid_data):
#             category = valid_data.pop("category", [])
#             post = Post.objects.create(**valid_data)
#             for categories in category:
#                 Post.category.create(categories)
#                 return post

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'
#         # filds = ["id", "title", "content", "published_date"]