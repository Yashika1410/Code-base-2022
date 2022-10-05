from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required

from .forms import SignupForm

# Create your views here.
def home_page_view(request):
    return render(request,'testapp/home.html')

@login_required
def java_exams_view(request):
    return render(request,'testapp/javaexams.html')
     
@login_required
def python_exams_view(request):
    return render(request,'testapp/pythonexams.html')

@login_required
def aptitude_exams_view(request):
    return render(request,'testapp/aptitudeexams.html')

def thanks_view(req):
    return render(req,'testapp/thanks.html')

def signup_view(req):
    form = SignupForm()
    if req.method == 'POST':
        form= SignupForm(req.POST)
        if form.is_valid():
            user=form.save()   #creating user object
            user.set_password(user.password)
            user.save()
            
            return HttpResponseRedirect('/accounts/login')
    return render(req, 'testapp/signup.html',{"form":form})

