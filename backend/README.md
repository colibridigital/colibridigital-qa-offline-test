# Backend side of the QA test

## Requirements

* Python 3.10+
* Docker

## Installation

To make it simpler to run the test, Colibri provides some out of the box processes to make it
easier to start the project quickly.

### Install docker

Make sure you have `docker` installed. You can follow the instructions in their [official documentation](https://docs.docker.com/get-docker/)
and choose the appropriate installation for your OS.

### Virtual environment

You are free to skip this step if you are familiar with the ways of Python but we **strongly** recommend
the use of a virtual environment to isolate the requirements needed to start the project.

There are many ways of creating a virtual environment in Python and it is up to you to choose what it
suits you best. We can only suggest a few ways.

1. [Virtualenvwrapper](https://formulae.brew.sh/formula/virtualenvwrapper) - Installed via `brew`.
2. [Pyenv](https://github.com/pyenv/pyenv)
3. [Venv](https://docs.python.org/3/library/venv.html) - Native from python.

### Activate the virtual environment

Since the virtual environment might differ from each person, please follow the instructions how
to activate the virtal environment from the installation you have chosen to use.

### Install the requirements

If you are using a UNIX/Linux based system you can simply run:

```shell
$ make requirements
```

Alternatively, if you don't want to use this or are using something else:

```shell
$ pip install -r requirements.txt
```

### Start the docker environment

If you are using the project for the first time, you will need to create an *external volume* to
persist data and work with local environment. To it so, run:

```shell
$ docker volume create colibri
```

Once the volume is create or if already exists, then run:

```shell
$ docker compose up -d # if you want to detach the logs
$ docker compose up # if you want the logs to be visible to you
```
