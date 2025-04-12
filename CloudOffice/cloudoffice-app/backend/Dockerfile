
FROM python:3.12.9

RUN mkdir /backend
WORKDIR /backend

RUN apt update && \
    apt install -y postgresql-client

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Don't copy source files here for dev — use volume instead
# COPY . .