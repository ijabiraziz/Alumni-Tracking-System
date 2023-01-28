from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

from django.db.models.signals import post_save
from django.dispatch import receiver
from .utils import generate_hash



def upload_to(instance, filename):
    return 'bulk_alumni/{filename}'.format(filename=filename)

class MyUserManager(BaseUserManager):
    def create_user(self, email,password=None):
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
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=20,null=True, blank=True)
    avator = models.ImageField(upload_to ='uploads/',null=True, blank=True)
    
    
    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['date_of_birth']

    def __str__(self):
        try:
            dept = str(Department.objects.get(name=self.department_id))
            return self.email + " Represents " + dept
        except:
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
    


class Program(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name
    
class Batch(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name


    
# import hashlib

# def generate_hash():
#     import uuid
#     data = str(uuid.uuid4())
#     return hashlib.sha256(data.encode('utf-8')).hexdigest()
    
    
class Alumni(models.Model):
    name = models.CharField(max_length=200, null=True,blank=True)
    email = models.EmailField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE, blank=True, null=True)
    phone = models.CharField(max_length=20, null=True,blank=True)
    location = models.CharField(max_length=200)
    company= models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    
    cgpa = models.CharField(max_length=200)
    is_employed=models.CharField(max_length=200)
    is_student=models.CharField(max_length=200)

    batch =models.ForeignKey(Batch, on_delete=models.CASCADE, blank=True, null=True)
    program =  models.ForeignKey(Program, on_delete=models.CASCADE, blank=True, null=True)
    createdAt =models.DateTimeField(auto_now_add=True)
    hash_data =     models.CharField(max_length=64, default= generate_hash)

    
    
    
    
    def __str__(self) -> str:
        return self.name
    
    
class Report(models.Model):
    name = models.CharField(max_length=200, null=True,blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)
    report = models.FileField(upload_to ='reports/', blank=True, null=True)
    entries = models.IntegerField(blank=True, null=True)
    

    
    def __str__(self) -> str:
        return self.name
    

    
class BulkAlumni(models.Model):
    # creator = models.ForeignKey(
    #     MyUser, on_delete=models.CASCADE, related_name="listings")
    title = models.CharField(
        max_length=80, blank=False, null=False)
    description = models.TextField (max_length=80, blank=True, null=True)
    file_url = models.FileField(upload_to=upload_to, blank=False, null=False)
    
    def __str__(self) -> str:
        return self.title
    
    def parse_file(self):
        file_obj =  self.file_url

        # # parse it 
        import pandas as pd
        df = pd.read_excel(file_obj)
        d=df.T.to_dict().values()
        alumni_list=list(d)
        for alumni in alumni_list:   
            
            department_instance =  Department.objects.get(name=alumni['department'])
            batch_instance = Batch.objects.get(name=alumni['batch'])
            program_instance = Program.objects.get(name=alumni['program'])
              
            alumni_obj = Alumni.objects.create(      
            name = alumni['name'],
            email = alumni['email'],
            department = department_instance,
            location = alumni['location'],
            phone = alumni['phone'],
            company = alumni['company'],
            position = alumni['position'],
            cgpa = alumni['cgpa'],
            is_employed = alumni['is_employed'],
            is_student = alumni['is_student'],
            batch = batch_instance,
            program = program_instance
        )
            alumni_obj.save()

    
    
class OneTimeLink(models.Model):
    link = models.CharField(max_length=255)
    expiration_date = models.DateTimeField()
    
    
    