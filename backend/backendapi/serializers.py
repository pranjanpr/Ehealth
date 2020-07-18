from rest_framework import serializers
from . models import patient_signup
from . models import specialist_signup
from . models import appointment
from . models import Document
#from . models import comments

class patient_signup_serializer(serializers.ModelSerializer):

    class Meta:
        model = patient_signup
        fields = '__all__'

class specialist_signup_serializer(serializers.ModelSerializer):

    class Meta:
        model = specialist_signup
        fields = '__all__'

class appointment_serializer(serializers.ModelSerializer):

    class Meta:
        model = appointment
        fields = '__all__'

class medical_record_serializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ['title']                
'''
class comments_serializer(serializers.ModelSerializer):

    class Meta:
        model = comments
        fields = '__all__'        
'''        