## Description

Blog API backend repo for web-learners task. 

## Prerequisites
This project uses PostgreSQL database. Connect to an instance running on your local machine or use docker.

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
-  Run the following command to start the PostgreSQL container:
     ```
     docker run -d --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 postgres:latest
     ```
     
   - This command will start a PostgreSQL container with the specified username, password, and database name. Port 5432 is exposed and mapped to the host machine. 

## Installation

1. Clone the repository: `git clone https://github.com/hari0205/web-learners-task.git`
2. Navigate to the project directory.
3. Install dependencies: `yarn install`
4. Create a .env file in root directory with following values
```
DATABASE_URL = "YOUR POSTGRES URL"
SECRET_KEY = "SECRET KEY FOR JWT"
```
5. To build typescript files: ` tsc`. This will create a new directory build.
6. To run the project: `node build/app.js`

7. To run dev build: `yarn start:dev`
8. To run initial migrations:  `yarn migrate:init` (Might be required if you run the application for the first time)
9. To run subsequent migrations : `yarn migrate:run`


## Documentation
- To access documentation, navigate to `/docs`
- Also included Insomnia and postman collections with the project. Respective clients can be used to import the collections.

