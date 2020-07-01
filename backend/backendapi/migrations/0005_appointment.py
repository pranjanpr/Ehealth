# Generated by Django 3.0.7 on 2020-07-01 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0004_auto_20200629_2020'),
    ]

    operations = [
        migrations.CreateModel(
            name='appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=256, null=True)),
                ('doctor_name', models.CharField(max_length=256, null=True)),
                ('date', models.DateField(null=True)),
                ('time_start', models.TimeField(null=True)),
                ('time_end', models.TimeField(null=True)),
            ],
        ),
    ]
