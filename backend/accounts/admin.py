from django.contrib import admin
from accounts.models import MyUser, Alumni, Report,Department

admin.site.register(MyUser)
admin.site.register(Report)
admin.site.register(Department)
admin.site.register(Alumni)