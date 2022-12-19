from pyexpat import model
from rest_framework import serializers
from .models import MyUser,Alumni,Report,Department,BulkAlumni,Batch, Program
from .models import OneTimeLink

class OneTimeLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneTimeLink
        fields = ('link', 'expiration_date')


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'
        
    def save(self):
        user = MyUser(email=self.validated_data['email'])
        password = self.validated_data['password']
        user.department_id = self.validated_data['department_id']
        user.set_password(password)
        user.save()
        return user
    

    
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

    def save(self):
        user = MyUser(email=self.validated_data['email'])
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user
    

class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value
    
    
class UserUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = MyUser
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        
class AlumniSerializer(serializers.ModelSerializer):
    department_name = serializers.SerializerMethodField(read_only=True)
    batch_name = serializers.SerializerMethodField(read_only=True)
    program_name = serializers.SerializerMethodField(read_only=True)
    
     
    class Meta:
        model = Alumni 
        fields = ['id','name','email','phone','location','company','position','cgpa','is_employed','is_student','createdAt', 'department_name','batch_name','program_name', 'department', 'batch', 'program','hash_data']
        
    def get_department_name(self, obj):
        try:
            dept_name = Department.objects.get(name=obj.department).name
            return dept_name
        except:
            return ""
    
    def get_batch_name(self, obj):
        try:   
            batch_name = Batch.objects.get(name=obj.batch).name
            return batch_name
        except:
            return ''
    
    def get_program_name(self, obj):
        try:
            program_name = Program.objects.get(name=obj.program).name
            return program_name
        except:
            return ''
        
        
class ReportSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Report
        fields = '__all__'
        

    
class BulkAlumniSerializer(serializers.ModelSerializer):
    file_url = serializers.FileField(required=False)
    class Meta:
        model = BulkAlumni
        fields = '__all__'
        

class DashboardStatsSerializer(serializers.ModelSerializer):
    total_alumnis = serializers.SerializerMethodField(read_only=True)
    employed_alumnis = serializers.SerializerMethodField(read_only=True)
    student_alumni = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Alumni
        fields = ['total_alumnis', 'employed_alumnis', 'student_alumni']

    def get_total_alumnis(self, obj):
        total = Alumni.objects.count()
        return total

    def get_employed_alumnis(self, obj):
        emp_alum = Alumni.objects.filter(is_employed="Yes").count()
        return emp_alum
    
    def get_student_alumni(self, obj):
        std_alum = Alumni.objects.filter(is_student="Yes").count()
        return std_alum
    
    
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'
        
        
class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
        
class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'
        

        


