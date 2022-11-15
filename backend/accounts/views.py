from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from accounts.models import MyUser
from accounts.serializers import RegistrationSerializer


from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from .utils import get_tokens_for_user
from .serializers import  PasswordChangeSerializer, UserUpdateSerializer
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
        serializer = RegistrationSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def register_user(request):
    print(request.data)
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
    
    if user is not None:
        login(request, user)
        auth_data = get_tokens_for_user(request.user)
        return Response({'msg': 'Login Success', **auth_data}, status=status.HTTP_200_OK)
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
    
    
    

    