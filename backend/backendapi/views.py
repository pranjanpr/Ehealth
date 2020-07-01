from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from passlib.hash import pbkdf2_sha256

from . serializers import patient_signup_serializer
from . serializers import specialist_signup_serializer
from . serializers import appointment_serializer
from . models import patient_signup
from . models import specialist_signup
from . models import appointment



class hello_world(APIView):

    def get(self, request):
        
        return Response({"name": "hello world"})





class patient_sign_up(APIView):

    def get(self, request):
        data_stored = patient_signup.objects.all()
        dataserialized = patient_signup_serializer(data_stored, many = True)
        data_dict = dataserialized.data
        return Response(data_dict)
        

    def post(self, request):
        
        data_serial = patient_signup_serializer(data = request.data, many = True)
        specialist_data_check_also = specialist_signup_serializer(data = request.data, many = True)
        if data_serial.is_valid() and specialist_data_check_also.is_valid():
            data_list_of_dict = data_serial.data
            data_dict = data_list_of_dict[0]
            enc_password = pbkdf2_sha256.encrypt(data_dict['password'], rounds = 12000, salt_size = 32)

            saver = patient_signup(email = data_dict['email'],
                                   name = data_dict['name'],
                                   date = data_dict['date'],
                                   password = enc_password)
            saver.save()
            return Response({"status":"Ok"})
        else:
            if (data_serial.is_valid()==False):
                return Response({"status":data_serial.errors})
            else:
                return Response({"status":specialist_data_check_also.errors})         







class specialist_sign_up(APIView):

    def get(self, request):

        data_stored = specialist_signup.objects.all()
        dataserialized = specialist_signup_serializer(data_stored, many = True)
        data_dict = dataserialized.data
        return Response(data_dict)

    def post(self, request):

        data_serial = specialist_signup_serializer(data = request.data, many = True)
        patient_check_up_also = patient_signup_serializer(data = request.data, many = True)

        if data_serial.is_valid() and patient_check_up_also.is_valid():
            data_list_of_dict = data_serial.data
            data_dict = data_list_of_dict[0]
            enc_password = pbkdf2_sha256.encrypt(data_dict['password'], rounds = 12000, salt_size = 32)

            saver = specialist_signup(email = data_dict['email'],
                                      name = data_dict['name'],
                                      speciality = data_dict['speciality'],
                                      experience = data_dict['experience'],
                                      place_of_practice = data_dict['place_of_practice'],
                                      postal_code = data_dict['postal_code'],
                                      password = enc_password)
            saver.save()
            return Response({"status":"Ok"})
        else:
            if(data_serial.is_valid()==False):
                return Response({"status":data_serial.errors})
            else:
                return Response({"status":patient_check_up_also.errors})     








class patient_doctor_login(APIView):

    def post(self, request):
        data_serial = patient_signup_serializer(data = request.data, many = True)
        data_serial_specialist = specialist_signup_serializer(data = request.data, many = True)

        if data_serial.is_valid() and data_serial_specialist.is_valid():
            return Response({"status":"Account with this email id does not exists"})
        else:
            if(data_serial.is_valid()==False):

                data_list_of_dict = data_serial.data
                data_dict = data_list_of_dict[0]
                data_stored_object = patient_signup.objects.filter(email = data_dict["email"])
                dataserialized = patient_signup_serializer(data_stored_object, many = True)
                patient_data_dict = dataserialized.data

                password_verify = pbkdf2_sha256.verify(data_dict["password"], (patient_data_dict[0])["password"])

                if(password_verify):
                    return Response({"status":patient_data_dict})
                else:
                    return Response({"status":"Password Incorrect"})    

            else:

                data_list_of_dict = data_serial_specialist.data
                data_dict = data_list_of_dict[0]
                data_stored_object = specialist_signup.objects.filter(email = data_dict["email"])
                dataserialized = specialist_signup_serializer(data_stored_object, many = True)
                specialist_data_dict = dataserialized.data

                password_verify = pbkdf2_sha256.verify(data_dict["password"], (specialist_data_dict[0])["password"])

                if(password_verify):
                    return Response({"status":specialist_data_dict})
                else:
                    return Response({"status":"Password Incorrect"})    





        
class appointments(APIView):

    def get(self, request, email_id="", patient_or_specialist=0):
        if(patient_or_specialist==0):
            appointment_data_objects = appointment.objects.filter(specialist_email_id = email_id)
            appointment_serial =  appointment_serializer(appointment_data_objects, many = True)
            appointment_data = appointment_serial.data
            return Response(appointment_data)
        else:
            appointment_data_objects = appointment.objects.filter(patient_email_id = email_id)
            appointment_serial =  appointment_serializer(appointment_data_objects, many = True)
            appointment_data = appointment_serial.data
            return Response(appointment_data)

    def post(self, request):

        data_serial = appointment_serializer(data = request.data, many = True)
        
        if(data_serial.is_valid()):
            data_appoint = data_serial.data
            data_dict = data_appoint[0]

            saver = appointment(patient_email_id = data_dict["patient_email_id"],
                                specialist_email_id = data_dict["specialist_email_id"],
                                date = data_dict["date"],
                                time_start = data_dict["time_start"],
                                time_end = data_dict["time_end"],
                                type_of_call = data_dict["type_of_call"])

            saver.save()
            return Response({"status":"Ok"})

        else:
            return Response({"status":data_serial.errors})    







# Create your views here.
