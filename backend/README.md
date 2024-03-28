# Backend side of the QA test

All the source code is under Colibri Digital terms and conditions and it must be followed.

## Test notes

All the views provided in this project are `RESTful` APIs using `Django Rest Framework`.
The view have no authentication method attached to make it simpler to start with but **it can be changed**
if it is required.

The views and functionalities might or might not be optimised and structured. It is up to you
to decide if this statement is true or not and change it accordingly.

## Requirements

- Python 3.10+
- Docker

## Installation

To make it simpler to run the test, Colibri provides some out of the box processes to make it
easier to start the project quickly.

### Install docker

Make sure you have `docker` installed. You can follow the instructions in their [official documentation](https://docs.docker.com/get-docker/) and choose the appropriate installation for your OS.

### Virtual environment

You are free to skip this step if you are familiar with the ways of Python but we **strongly** recommend the use of a virtual environment to isolate the requirements needed to start the project. Add the virtual environment folder to te backend `.gitignore`.

There are many ways of creating a virtual environment in Python and it is up to you to choose what it suits you best. We can only suggest a few ways.

1. [Virtualenvwrapper](https://formulae.brew.sh/formula/virtualenvwrapper) - Installed via `brew`.
2. [Pyenv](https://github.com/pyenv/pyenv)
3. [Venv](https://docs.python.org/3/library/venv.html) - Native from python.

### Activate the virtual environment

Since the virtual environment might differ from each person, please follow the instructions how to activate the virtal environment from the installation you have chosen to use.

### Install the requirements

If you are using a UNIX/Linux based system you can simply run:

```shell
$ make requirements
```

Alternatively, if you don't want to use this or are using something else:

```shell
$ pip install -r requirements/development.txt
```

### Start the docker environment

If you are using the project for the first time, you will need to create an _external volume_ to persist data and work with local environment. To it so, run:

```shell
$ docker volume create colibri
```

Once the volume is create or if already exists, then run:

```shell
$ docker compose up -d # if you want to detach the logs
$ docker compose up # if you want the logs to be visible to you
```

### Run the initial migrations

You will need all the models to be reflected in the database, so, run:

```shell
$ make migrate
```

#### Generate any migration

If you wish to generate any migration you can also run:

```shell
$ make makemigrations
```

### Load the initial mock data

Colibri provides some initial mock data to help you out with the initial process. To load the data, run:

```shell
$ make load_data
```

### Start the development server

To make it simpler and easier to start the local development with unique development settings,
run:

```shell
$ make run
```

These are just additional settings that will allow you to run the server using `django-extensions`
and nothing else special. You can ignore this and run directly:

```shell
$ python colibri/manage.py runserver
```

### Access the Swagger

You can now access the project OpenAPI documentation by accessing:

- **Swagger** - `http://localhost:8000/docs/swagger/`
- **Redoc** - `http://localhost:8000/docs/redoc/`

## Notes

This backend is for the purposes of testing and **should not be used in production** or **shared with anyone**.

# Quick install example:

### In a new tab:

```shell
python -m venv venv
source venv/bin/activate
pip install -r requirements/development.txt
docker volume create colibri
docker compose up
```

### In another tab:

```shell
source venv/bin/activate
make migrate
make run
```
