from uuid import uuid4
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager, BaseUserManager
from django.template.defaultfilters import slugify
from django.utils import timezone 
from django.utils.translation import gettext_lazy 




# Create your models here.
class CustomUserManager(UserManager):
    def create_superuser(self, email, name, password, **other_fields):

        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, name, password, **other_fields)

    def create_user(self, email, name, password, **other_fields):
  
      if not email:  
        raise ValueError(('You must provide an email address'))

      email = self.normalize_email(email)
      user = self.model(email=email, 
                        name=name,
                        **other_fields)
      user.set_password(password)
      user.save()
      return user
    
class User (AbstractBaseUser, PermissionsMixin):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  email = models.EmailField(('email address'), unique=True)
  name = models.CharField(max_length=150, blank=True, null=True)
  avatar=models.ImageField(upload_to='upload/avatar')
  about = models.TextField(('about'), max_length=500, blank=True)

  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)

  start_date = models.DateTimeField(default=timezone.now)
  date_joined=models.DateTimeField(auto_now_add=True)
  last_joined=models.DateTimeField(blank=True, null=True)

  objects = CustomUserManager()

  USERNAME_FIELD = 'email'
  EMAILNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name',]

# to get the user information
  def avatar_url(self):
      if self.avatar:
         return f'{settings.WEBSITE_URL}{self.avatar.url}'
      else:
          return ""





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
    image = models.ImageField(upload_to='post/images', blank=True, null=True)
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

    # def image_url(self):
    #     return f'{settings.WEBSITE_URL}{self.image.url}'



class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    #this will make the newly posted article to appear first
    
    #output the first 50 characters
    def __str__(self):
        return self.content
 
class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=225)
    description = models.TextField()
    price_per_night = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    category = models.CharField(max_length=255)
    favourited = models.ManyToManyField(User, related_name='favorite', blank=True)
    image = models.ImageField(upload_to='uploads/properties', blank=True, null=True)
    landlord = models.ForeignKey(User, related_name='properties', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def Image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'


class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    property = models.ForeignKey(Property, related_name='reservation', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_night = models.IntegerField()
    guests = models.IntegerField()
    total_price = models.FloatField()
    created_by = models.ForeignKey(User, related_name='reservation', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ManyToManyField(User, related_name='conversation')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class ConversationMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    body = models.TextField()
    sent_to = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, related_name='sent_message', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
