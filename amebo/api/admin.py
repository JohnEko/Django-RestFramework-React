from django.contrib import admin
from .models import Category, Post, Comment,  User
# Register your models here.
#Lets add a model admin so we can see when things where created on the admin
# admin.site.register(CustomUserManager)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Comment)
