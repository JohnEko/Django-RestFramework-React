from django import forms 

from .models import Post, Property


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = (
                    'title', 
                    'description',
                    'price_per_night', 
                    'bedrooms', 
                    'bathrooms', 
                    'guests', 
                    'country', 
                    'country_code', 
                    'category',
                    'image',
                )


        # fileds = ('title', 'description','price_per_night', 'bedrooms', 'bathrooms', 'guest', 'country', 'country_code', 'category', 'Image' )
