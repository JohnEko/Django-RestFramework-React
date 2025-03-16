from django.forms import ModelForm

from .models import Post, Property


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = '__all__'
     
        # fileds = ['id', 'title', 'description','price_per_night', 'bedrooms','guest', 'country', 'country_code', 'Image', 'landlord', 'created_at' ]
