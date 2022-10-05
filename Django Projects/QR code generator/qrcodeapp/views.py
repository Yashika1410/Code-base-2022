from django.shortcuts import render
from django.conf import settings
from qrcode import *
import time

def qr_gen(request):
    if request.method == 'POST':
        data = request.POST['data']
        img = make(data)
        img_name = f'qr_{time.time()}.png'
        img.save(settings.MEDIA_ROOT/img_name)
        return render(request, 'index.html', {'img_name': img_name})
    return render(request, 'index.html')