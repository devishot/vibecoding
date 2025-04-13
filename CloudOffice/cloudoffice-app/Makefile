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
	docker compose -f "docker-compose.dev.yml" up

run_docker_rebuild:
	docker compose -f "docker-compose.dev.yml" up --build

stop:
	docker compose -f "docker-compose.dev.yml" down

stop_all_containers:
	@echo "Stopping all running containers..."
	@docker ps -q | xargs -r docker stop

remove_all_containers:
	@echo "Removing all containers..."
	@docker ps -aq | xargs -r docker rm

clean_volumes:
	@echo "Removing all volumes..."
	@docker system prune -af --volumes

clean: stop_all_containers remove_all_containers clean_volumes

# Connect to docker containers

bash_backend:
	docker compose -f "docker-compose.dev.yml" exec backend bash

bash_frontend:
	docker compose -f "docker-compose.dev.yml" exec frontend bash

# Database migrations via docker container

alembic_create_revision:
	@read -p "Enter revision message: " msg; \
	docker compose -f "docker-compose.dev.yml" exec backend alembic revision --autogenerate -m "$$msg"

alembic_upgrade:
	docker compose -f "docker-compose.dev.yml" exec backend alembic upgrade head

alembic_downgrade:
	docker compose -f "docker-compose.dev.yml" exec backend alembic downgrade -1

alembic_cleanup:
	docker compose -f "docker-compose.dev.yml" exec backend alembic downgrade base