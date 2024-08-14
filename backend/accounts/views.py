from pathlib import Path

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, HttpResponse, reverse
from django.core.files import File
from django.db.models import Q

from rest_framework import status, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import BulkAlumni, Report, Batch, Program, OneTimeLink
from accounts.models import MyUser,Department, Alumni
from accounts.serializers import RegistrationSerializer,MyUserSerializer, DepartmentSerializer, AlumniSerializer,DashboardStatsSerializer,ReportSerializer

from .serializers import  PasswordChangeSerializer, UserUpdateSerializer,UserDetailSerializer
from .serializers import BulkAlumniSerializer, BatchSerializer, ProgramSerializer, OneTimeLinkSerializer

from .utils import get_random_string, generate_hash, get_tokens_for_user


@api_view(['GET'])
def get_routes(request):
    return Response('Base Route')


@api_view(['GET'])
def list_users(request):
    users = MyUser.objects.all()
    serializer = RegistrationSerializer(users, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def user_detail(request):    
    try:
        user = MyUser.objects.get(request.user)
    except:
        return Response({'message':'The User is Not Available' },status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        serializer = MyUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def register_user(request):
    # print(request.data)
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    if 'email' not in request.data or 'password' not in request.data:
        return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)    
    email = request.data['email']
    password = request.data['password']
    user = authenticate(request, email=email, password= password)
    
    instance = MyUser.objects.filter(email=email)[0]
    # print(instance.name)
    if user is not None:
        login(request, user)
        auth_data = get_tokens_for_user(request.user)
        return Response({'msg': 'Login Success','Name': instance.name ,**auth_data}, status=status.HTTP_200_OK)
    return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    
@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serializer = UserUpdateSerializer(user, many=False)
    user.name = request.data.get("name")
    user.email = request.data.get("email")
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(requests):
    user = requests.user
    serializer = UserDetailSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = PasswordChangeSerializer(context={'request': request}, data=request.data)
    serializer.is_valid(raise_exception=True) #Another way to write is as in Line 17
    request.user.set_password(serializer.validated_data['new_password'])
    try:        
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except :
        message ={'detail': 'unable'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)  
    

@api_view(['GET'])
def list_departments(request):
    deptt = Department.objects.all()
    serializer = DepartmentSerializer(deptt, many=True)
    return Response (serializer.data)


@api_view(['POST'])
def add_alumni(request):
    serializer = AlumniSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def add_bulk_alumni(request):
    parser_classes = (MultiPartParser, FormParser)
    serializer = BulkAlumniSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def dashboard_stats(request):
    alumni = Alumni.objects.all()
    serializer = DashboardStatsSerializer(alumni)
    return Response (serializer.data)
    

@api_view(['GET'])
def recent_alumnis(request):
    alumni =reversed( Alumni.objects.all())
    l_alumni= list(alumni)[:5]
    serializer = AlumniSerializer(l_alumni, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def list_alumnis(request):
    alumni =reversed( Alumni.objects.all())
    serializer = AlumniSerializer(alumni, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def list_bs_alumnis(request):
    alumni =reversed( Alumni.objects.filter(program=1))
    serializer = AlumniSerializer(alumni, many=True)
    return Response (serializer.data)
    

@api_view(['GET'])
def list_ms_alumnis(request):
    alumni =reversed( Alumni.objects.filter(program=2))
    serializer = AlumniSerializer(alumni, many=True)
    return Response (serializer.data)
  

@api_view(['GET'])
def list_phd_alumnis(request):
    alumni =reversed( Alumni.objects.filter(program=3))
    serializer = AlumniSerializer(alumni, many=True)
    return Response (serializer.data)

    

@api_view(['POST'])
def generate_report(request):
    data = request.data
    search_list = data['search_list']
    name=data['name']
    s_list= search_list.split(',')
    org_l= []
    for e in s_list:
        r = int(e)
        org_l.append(r)
    print( org_l)
    d_list=[]
    for pk in org_l:
        alumni=Alumni.objects.get(pk=pk)
        serializer = AlumniSerializer(alumni, many=False)  
        d_list.append(dict(serializer.data))
    import pandas as pd 
    df=pd.DataFrame(d_list)
    file_path = f'../mediafiles/reports/{get_random_string()}.csv'
    df.to_csv(file_path)
    path = Path(file_path)
    
    # report = ''
    report_inst=Report.objects.create(
        name=name,
        entries=len(org_l)
    )
    with path.open(mode='rb') as f:
        report_inst.report = File(f, name=path.name)
        report_inst.save()        
    return Response ( status=status.HTTP_200_OK)
    
        
@api_view(['GET'])
def list_reports(request):
    reports =Report.objects.all()
    serializer =ReportSerializer(reports, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def list_batch(request):
    reports =Batch.objects.all()
    serializer =BatchSerializer(reports, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def list_program(request):
    reports =Program.objects.all()
    serializer =ProgramSerializer(reports, many=True)
    return Response (serializer.data)


import string
import random
from django.utils import timezone


def generate_one_time_link():
  base_url = "localhost:8000"
  characters = string.ascii_letters + string.digits
  random_text = ''.join(random.choices(characters, k=8))
  one_time_link = base_url + "/" + random_text
  return one_time_link


@api_view(['POST'])
def one_time_link_view(request):
    # Generate the one-time link and set the expiration date
    link = generate_one_time_link()
    expiration_date = timezone.now() + timezone.timedelta(days=1)
    one_time_link = OneTimeLink.objects.create(link=link, expiration_date=expiration_date)

    serializer = OneTimeLinkSerializer(one_time_link)
    return Response(serializer.data)


@api_view(['PATCH','GET'])
def update_alumni(request, hash_data):
    # Retrieve the model instance   
    instance = Alumni.objects.get( hash_data=hash_data)
    # Update the model instance with the data in the request
    if request.method == 'PATCH':
        instance.hash_data=generate_hash()
    serializer = AlumniSerializer(instance, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

from django.core.mail import send_mail

@api_view(['POST'])
def send_email(request ):
    data = request.data
    ids_list = data['ids_list']
    s_list= ids_list.split(',')
    org_l= []
    for e in s_list:
        r = int(e)
        org_l.append(r)
    print( org_l)
    d_list=[]
    for pk in org_l:
        alumni=Alumni.objects.get(pk=pk)
        serializer = AlumniSerializer(alumni, many=False)  
        d_list.append(dict(serializer.data))

    for alum in d_list:
        alum_email= alum.get('email')
        alum_hash = alum.get('hash_data')
        alum_name = alum.get('name')
        # email_list.append(alum_email)
        
        subject = 'Please Update Your Profile'
        message = f'Hi {alum_name}\n This is a link where you Can Update Your Profile, http://localhost:3000/update-alumni/{alum_hash}'
        email_from = 'haxratali0@gmail.com'
        recipient_list = [alum_email]
        send_mail(subject, message, email_from, recipient_list)
    return Response('Message Send Successfully')


@api_view(['GET','POST'])
def search_alumni(request):
    if request.method == 'GET':
        qu = Alumni.objects.all()
        serializer = AlumniSerializer(qu, many=True)  
        print(serializer.data)     
        return Response(serializer.data)       
    elif request.method == 'POST':       
        name = request.GET.get('name')
        location = request.GET.get('location')
        email =request.GET.get('email')
        phone =request.GET.get('phone')
        company=request.GET.get('company')
        position =request.GET.get('position')

    # program = request.GET.get('program')
 
        if name :
            # search model based on multiple fields
            results = Alumni.objects.filter(
                Q(name__icontains=name) 
            
            )
            
        if email:
            email_results = Alumni.objects.filter(
                Q(email__icontains=email) 
            
            )
            results.union(email_results)
            
        if location:
            location_results = Alumni.objects.filter(
                Q(location__icontains=location) 
            
            )
            results.union(location_results)
        if phone:
            phone_results = Alumni.objects.filter(
                Q(phone__icontains=phone) 
            
            )
            results.union(phone_results)
        if company:
            company_results = Alumni.objects.filter(
                Q(company__icontains=company) 
            
            )
            results.union(company_results)
        if position:
            position_results = Alumni.objects.filter(
                Q(position__icontains=position) 
            
            )
            results.union(position_results)
        serializer = AlumniSerializer(results, many=True)
        print(serializer.data)           
        return Response(serializer.data)
    else:
        return Response('Bad Request Please do GET or Post')
