# Generated by Django 2.0 on 2020-07-04 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0010_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='listener',
            field=models.CharField(max_length=256, null=True),
        ),
    ]