.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: clean_pyc clean_pycache ## Clean all PYC in the system

.PHONY: clean_pyc
clean_pyc: ## Cleans all *.pyc in the system
	find . -type f -name "*.pyc" -delete || true

.PHONY: clean_pycache
clean_pycache: ## Removes the __pycaches__
	find . -type d -name "*__pycache__*" -delete

.PHONY: migrate
migrate: # Runs the migrations
	python colibri/manage.py migrate --noinput

.PHONY: migrations
migrations: ## Generate migrations
	python colibri/manage.py makemigrations

.PHONY: requirements
requirements: ## Installs the requirements
	pip install -r requirements/development.txt

.PHONY: test
test: ## Runs the unit tests from the scratch by recreating the testing database
	cd colibri 										&&\
	pytest $(TESTONLY) --disable-pytest-warnings -s -vv $(DB)				&&\
	cd .

.PHONY: load_data
load_data: ## Loads the initial data
	python colibri/manage.py load_data

.PHONY: shell
shell:
	DJANGO_SETTINGS_MODULE=colibri.development.settings python colibri/manage.py shell_plus

.PHONY: run
run: ## Starts the dev server
	DJANGO_SETTINGS_MODULE=colibri.development.settings python colibri/manage.py runserver_plus 0.0.0.0:8000

ifndef VERBOSE
.SILENT:
endif
