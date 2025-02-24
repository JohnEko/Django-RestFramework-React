#!/bin/sh

# check if db is up and running 
if [ "DATABASE" = "postgres" ] 
then
    echo "check for database running"
# the nc is netcat, if it dont connect sleep until it connects ficlose the loop
    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "database is up and running :-D"
fi

python manage.py makemigrations
python manage.py migrate

# this is a special parameter that parse to the entrypoint if a space is in it
exec "$@"