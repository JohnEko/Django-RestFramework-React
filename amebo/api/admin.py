from django.contrib import admin
# 
from .models import Category, Post, Comment, Property, Reservation, Conversation, ConversationMessage

# Register your models here.  Category, Post, Comment,
#Lets add a model admin so we can see when things where created on the admin

admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Property)
admin.site.register(Reservation)
admin.site.register(Conversation)
admin.site.register(ConversationMessage)

