from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns
from accounts import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns =[
    path('', views.get_routes, name='base_route'),
    path('register/', views.register_user, name='register-user'),
    path('login/', views.login_user, name='login-user'),
    path('logout/', views.logout_user, name='logout'),
    path('change-password/', views.change_password, name='change-password'),
    path('update-user/', views.update_user, name='update-user'),
    path('refresh-token/', jwt_views.TokenRefreshView.as_view(), name='refresh-token'),
    path('list-departments/', views.list_departments, name='list_departments'),
    
    path('users-list/', views.list_users, name='user-list'),
    
    path('user-detail/', views.user_detail,name='user-detail'),
    path('add-alumni/', views.add_alumni, name='add-alumni'),
    path('add-bulk-alumni/', views.add_bulk_alumni , name='add-bulk-alumni'),
    path('dashboard-stats/', views.dashboard_stats , name='dashboard_stats'),
    
    path('recent_alumnis/', views.recent_alumnis , name='recent_alumnis'),
    path('list-alumnis/', views.list_alumnis , name='list-alumnis'),
     path('list-bs-alumnis/', views.list_bs_alumnis , name='list-bs-alumnis'),
     path('list-ms-alumnis/', views.list_ms_alumnis , name='list-ms-alumnis'),
     path('list-phd-alumnis/', views.list_phd_alumnis , name='list-phd-alumnis'),
     path('user-profile/', views.getUserProfile , name='user-profile'),
     path('generate-report/', views.generate_report , name='generate-report'),
     path('list-reports/', views.list_reports , name='list-reports'),
     path('list-batch/', views.list_batch , name='list-batch'),
     path('list-program/', views.list_program , name='list-program'),
     
     
     
     
   
     

]