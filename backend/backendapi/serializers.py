from rest_framework import serializers
from . models import patient_signup
from . models import specialist_signup

class patient_signup_serializer(serializers.ModelSerializer):

    class Meta:
        model = patient_signup
        fields = '__all__'

class specialist_signup_serializer(serializers.ModelSerializer):

    class Meta:
        model = specialist_signup
        fields = '__all__'
