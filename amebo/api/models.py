from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.template.defaultfilters import slugify

# Create your models here.
class CustomUserManager(UserManager):
    def create_user(self, name, email, password, **extra_fileds):
        if not email:
            raise ValueError("You have not specify a valid email")
        
        email =self.normalize_email(email)
        user= self.model(email=email, name=name, **extra_fileds)
        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def new_created_user(self, name=None, email=None, passwprd=None, **extra_fields):
        extra_fields.setdefault('is_staff, Fasle')
        extra_fields.setdefault('is_superuser, Fasle')
        return self.create_user(name, email, passwprd, **extra_fields)
    
    def new_created_user(self, name=None, email=None, passwprd=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, passwprd, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    id=models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email=models.EmailField(unique=True)
    name=models.CharField(max_length=250, blank=True, null=True)
    avatar=models.ImageField(upload_to='uploads/avatar')

  # IF WE WANT EMAIL VALIDATION WE CAN SET IT TO FALSE
    is_active=models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False) 

    date_join =models.DateTimeField(auto_now=True)
    last_login=models.DateTimeField(blank=True, null=True)

    objects =CustomUserManager()
    # now lets check which fields we use loggin in
    USERNAME_FIELD = "email"
    EMAIL_FIELD="email"
    REQUIRED_FIELDS=['name',]

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
 

