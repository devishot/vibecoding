include .env

# Local commands

create_env:
	conda create -n vibecoding python=3.12.9

install:
	pip install -r requirements.txt

psql_connect:
	psql postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD_ESCAPED}@${POSTGRES_HOST}:5432/${POSTGRES_DB}

python_lint:
	mypy backend/app

# Manage docker containers

run:
	docker compose up

stop:
	docker compose down

stop_all_containers:
	@echo "Stopping all running containers..."
	@docker ps -q | xargs -r docker stop

remove_all_containers:
	@echo "Removing all containers..."
	@docker ps -aq | xargs -r docker rm

clean: stop_all_containers remove_all_containers

# Connect to docker containers

bash_backend:
	docker compose exec backend bash

bash_frontend:
	docker compose exec frontend bash

# Database migrations via docker container

alembic_create_revision:
	@read -p "Enter revision message: " msg; \
	docker compose exec backend alembic revision --autogenerate -m "$$msg"

alembic_upgrade:
	docker compose exec backend alembic upgrade head

alembic_downgrade:
	docker compose exec backend alembic downgrade -1

alembic_cleanup:
	docker compose exec backend alembic downgrade base