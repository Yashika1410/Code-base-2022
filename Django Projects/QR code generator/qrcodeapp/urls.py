from django.urls import path
from . import views

urlpatterns = [
    path('', views.qr_gen, name='qr_gen'),
]
