from django.contrib import admin
from accounts.models import MyUser, Alumni, Report,Department, Program, BulkAlumni, Batch, OneTimeLink

admin.site.register(MyUser)
admin.site.register(Report)
admin.site.register(Department)
admin.site.register(Alumni)
admin.site.register(Program)
admin.site.register(BulkAlumni)
admin.site.register(Batch)
admin.site.register(OneTimeLink)

