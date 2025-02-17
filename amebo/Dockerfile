FROM python:latest

WORKDIR /mnt/c/Users/T540p/Desktop/amebo/amebo

ADD . /mnt/c/Users/T540p/Desktop/amebo/amebo/

# This makes python not to write this pyc file we normally see and the 
# buffer make it run faster without buffering we dont want buffer
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONNUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat-traditional
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
RUN ls

# we copy the entrypoint to the source folder WORKDIR
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /mnt/c/Users/T540p/Desktop/amebo/amebo/entrypoint.sh
RUN chmod +x /mnt/c/Users/T540p/Desktop/amebo/amebo/entrypoint.sh

# it copy everything to the django folder directory
COPY . .

ENTRYPOINT ["/mnt/c/Users/T540p/Desktop/amebo/amebo/entrypoint.sh"]
