from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


# Create your models here
class MyUserManager(BaseUserManager):
    def create_user(self, email,password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,

        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
    
class Department(models.Model):
    name = models.CharField(max_length=200, null=True,blank=True)

    
    def __str__(self) -> str:
        return self.name
    

class MyUser(AbstractBaseUser):
    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    name = models.CharField(max_length=50, null=True,blank=True)
    department = models.ForeignKey(Department,on_delete=models.SET_NULL,null=True)
    

    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['date_of_birth']

    def __str__(self):
        return self.email
    
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,

        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    



    
class Alumni(models.Model):
    department = models.ForeignKey(Department,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200, null=True,blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)

    
    def __str__(self) -> str:
        return self.name
    
    
class Report(models.Model):
    name = models.CharField(max_length=200, null=True,blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)

    
    def __str__(self) -> str:
        return self.name
    

    