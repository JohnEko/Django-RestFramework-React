FROM python:latest

WORKDIR /mnt/c/Users/T540p/Desktop/amebo/amebo

# This makes python not to write this pyc file we normally see and the 
# buffer make it run faster without buffering we dont want buffer
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONNUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# it copy everything to the django folder directory
COPY . .
