cd Ehealth
cd backend
virtualenv simsim
cd simsim
source bin/activate
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install passlib
pip install -r ../requirements.txt
source bin/activate
cd ..
python manage.py makemigrations
python manage.py migrate
redis-server & python manage.py runserver
