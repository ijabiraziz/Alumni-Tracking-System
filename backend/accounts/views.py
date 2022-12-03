from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import MyUser,Department, Alumni
from accounts.serializers import RegistrationSerializer,MyUserSerializer, DepartmentSerializer, AlumniSerializer


from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from .utils import get_tokens_for_user
from .serializers import  PasswordChangeSerializer, UserUpdateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



@api_view(['GET'])
def get_routes(request):
    return Response('Base Route')

@api_view(['GET'])
def list_users(request):
    users = MyUser.objects.all()
    serializer = RegistrationSerializer(users, many=True)
    return Response (serializer.data)


@api_view(['GET'])
def user_detail(request,pk):
    
    try:
        user = MyUser.objects.get(pk=pk)
    except:
        return Response({'message':'The User is Not Available' },status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        serializer = MyUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def register_user(request):
    print(request.data)
    deptt= Department.objects.get(name=request.data['department'])
    print(deptt)
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
    user = authenticate(request, email=email, password=password)
    
    instance = MyUser.objects.filter(email=email)[0]
    print(instance.name)
    
    

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
def update_user(request,pk):
    instance = MyUser.objects.get(pk=pk)
    instance.name = request.data.get("name")
    instance.save()
    serializer = UserUpdateSerializer(instance, data=request.data)
    serializer.is_valid(raise_exception=True)
    MyUser().perform_update(serializer)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = PasswordChangeSerializer(context={'request': request}, data=request.data)
    serializer.is_valid(raise_exception=True) #Another way to write is as in Line 17
    request.user.set_password(serializer.validated_data['new_password'])
    request.user.save()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
    

@api_view(['GET'])
def list_departments(request):
    deptt = Department.objects.all()
    serializer = DepartmentSerializer(deptt, many=True)
    return Response (serializer.data)
    
@api_view(['POST'])
def add_alumni(request):
    data = request.data
    alumni = Alumni.objects.create(
        name = data['name'],
        email = data['email'],
        department = data['department'],
        location = data['location'],
        phone = data['phone'],
        company = data['company'],
        position = data['position'],
        cgpa = data['cgpa'],
        is_employed = data['is_employed'],
        is_student = data['is_student'],
        batch = data['batch'],
        program = data['is_student']
    )
    alumni.save()
    serializer = AlumniSerializer(alumni, many=False)    
    return Response(serializer.data)