cd Ehealth
cd backend
virtualenv simsim
cd simsim
source bin/activate
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install passlib
source bin/activate
cd ..
python manage.py runserver