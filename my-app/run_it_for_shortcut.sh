cd Ehealth
cd backend
virtualenv simsim
cd simsim
source bin/activate
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install passlib
cd simsim
source bin/activate
cd ..
cd backend
python manage.py runserver