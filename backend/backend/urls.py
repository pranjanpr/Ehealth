"""backend URL Configuration

USAGE of apis
0- admin/ no use for now

1- helloworld/ for normal practice and for debugging, returns {"name": "hello world"} json

2- patient_signup/ for the signup page of patient, pass the POST request from frontend along with the following json file, eg.
    [{"email" = "ss@gg.com",
    "name" = "somename",
    "date" = "1990-06-06",
    "password" = "sssw"}]
   The email would be automatically checked by the backend if it is unique and valid. 
   Password will be automatically encrypted and stored by the backend.
   If new patient is stored, then the Response will be {"status":"Ok"}
   If there is some problem, then the Resposne will be {"status": errors}      

3- specialist_signup/ for the signup of specialist. Same instructions as for the patient signup. Json file to be sent in POST request, eg.
    [{"email" = "docsss@gmail.com",
     "name" = "docname",
     "speciality" = "Dentist",
     "experience" = "4",
     "place_of_practice" = "Arora Clinic",
     "postal_code" = "202021",
     "password" = "www12345"}]

4- patient_doctor_login/ for the login of both patient and specialist. It would be a POST request along with following json file, eg.
    [{"email":"ss@gg.com",
    "password":"try1es"}]

    If no such email is present in the patient and specialist database, then Response will be {"status":"Account with this email id does not exists"}
    If email exists and password is incorrect, then Response will be {"status":"Password Incorrect"}
    If both email and password are correct, then Response will be {"status": signup_details_of_person_}    

5- appointment/ is for booking the appointment. It would be a POST request along with foloowing json file, eg.
    [{"patient_email_id":"sajal@gmail.com",
    "specialist_email_id":"chakraborty@gmail.com",
    "date":"2020-03-04",
    "time_start":"11:00:33",
    "time_end":"14:33:22",
    "type_of_call":"Audio"}]

6- appointment/appointment/<str:email_id>/<int:patient_or_specialist> has to be used for getting the appointment details of patient or specialist.
Here in <str:email_id>, the email_id of patient or specialist will be passed
In <int:patient_or_specialist>, 0 will be passed if its a specialist email-id and 1 will be passed if its a patient's email id
eg. localhost:8000/appointment/appointment/sajal@gmail.com/1  means that we want the appointment details of patient with email_id sajal@gmail.com 
eg. localhost:8000/appointment/appointment/chakraborty@gmail.com/0  means that we want the appointment details of specialist with email_id chakraborty@gmail.com 

"""
from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from backendapi import views
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('helloworld/', views.hello_world.as_view()),
    path('patient_signup/', views.patient_sign_up.as_view()),
    path('specialist_signup/', views.specialist_sign_up.as_view()),
    path('patient_doctor_login/', views.patient_doctor_login.as_view()),
    path('appointment/<str:email_id>/<int:patient_or_specialist>', views.appointments.as_view()),
    path('appointment/', views.appointments.as_view()),

    
]
