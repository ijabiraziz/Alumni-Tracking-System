
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from base.serializer import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAdminUser,IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for  k, v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['POST'])
def registerUser(requests):
    data = requests.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['username'],
            email = data ['email'],
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message ={'detail': 'user with this email already exisit'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(requests):
    user = requests.user
    serializer = UserSerializerWithToken(user, many=False)
    data = requests.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    
    if data ['password'] !='':
        user.password = make_password(data['password'])
        
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(requests):
    user = requests.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(requests):
    users = User.objects.all()
    serializer = UserSerializer(users,many=False)

    return Response(serializer.data)



