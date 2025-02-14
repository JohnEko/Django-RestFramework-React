from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    slug=models.SlugField(max_length=250, null=True, blank=True)
    participants =models.ManyToManyField(User, related_name='participants', blank=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    views = models.PositiveIntegerField(default=0)

#this will make the newly posted article to appear first
     
    def __str__(self):
        return self.title
    
    # The slugify function helps to tranform the user title to readable format and replace all space with minus 
    def save(self, *args, **kwargs):
        to_assign=slugify(self.title)
    
    # we need to check if same title in the db filter and append it
        if Post.objects.filter(slug=to_assign).exists():
            to_assign=to_assign+str(Post.objects.all().count())
        self.slug=to_assign
        super().save(*args, **kwargs)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

#this will make the newly posted article to appear first
    
#output the first 50 characters
    def __str__(self):
        return self.content
    
