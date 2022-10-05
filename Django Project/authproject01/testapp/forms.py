from django import forms
from django.contrib.auth.models import User  #so basically in normal method
#we construct model and then import it here but as the model is provided by auth application
#which is given by django framework, we not need to import it from models.py
# model module will be provided by '''django.contrib.auth.models '''

class SignupForm(forms.ModelForm):
    class Meta:
        model=User
        fields=['username','password','email','first_name','last_name']

 