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

.PHONY: run
run: ## Starts the local server with production settings
	ESMERALD_SETTINGS_MODULE=mercury.configs.development.settings.DevelopmentAppSettings esmerald runserver

.PHONY: test
test: ## Runs the local tests with nose
	ESMERALD_SETTINGS_MODULE=mercury.configs.testing.settings.TestingAppSettings pytest --disable-warnings -s $(TESTONLY)

.PHONY: requirements
requirements: ## Installs the requirements
	pip install -r requirements.txt

ifndef VERBOSE
.SILENT:
endif