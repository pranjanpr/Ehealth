from django.db import models
import uuid
from django.core.exceptions import ValidationError
from django.db.models import Q


# Create your models here.

class patient_signup(models.Model):
     
     email = models.EmailField(max_length=254, unique=True)
     name = models.CharField(max_length=120, null=True)
     date = models.DateField(null=True)
     password = models.CharField(max_length=256)


class specialist_signup(models.Model):

     email = models.EmailField(max_length=254, unique=True)
     name = models.CharField(max_length=120, null=True)
     speciality = models.CharField(max_length=256, null=True)
     experience = models.IntegerField(null=True)
     place_of_practice = models.TextField(max_length=1000, null=True)
     postal_code = models.IntegerField(null=True)
     password = models.CharField(max_length=256)


class appointment(models.Model):

     patient_email_id = models.EmailField(max_length=256, null=True)
     specialist_email_id = models.EmailField(max_length=256, null=True)
     date = models.DateField(null=True)
     time_start = models.TimeField(null=True)
     time_end = models.TimeField(null=True)
     type_of_call = models.CharField(max_length=256, null=True)

'''
class comments(models.Model):

     email_sender = models.EmailField(max_length=256, null=True)
     email_receiver = models.EmailField(max_length=256, null=True)
     comment = models.TextField(null=True)
'''     


class Document(models.Model):
    doc_file = models.FileField(upload_to='app/img')
    title = models.CharField(null = True, max_length = 256)
    email = models.EmailField(max_length=254, null = True)

    class Meta:
        unique_together = (('title', 'email'))







def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )


class Message(models.Model):

    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    author = models.CharField(
        blank=False,
        null=False,
        max_length = 256
    )

    listener = models.CharField(
        blank=False,
        null=True,
        max_length = 256
    )
    
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def last_50_messages(self, name1, name2):
        return Message.objects.order_by('-created_at').filter(Q(author = name1, listener = name2)|Q(author = name2, listener = name1))[:50]



