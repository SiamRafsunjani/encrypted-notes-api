# Encrypted Notes api

This is a simple API to store encrypted notes. It uses Node.js, NestJs, and PostgreSQL. The notes are encrypted using the AES algorithm. This is a sample project to demonstrate how to use NestJs with PostgreSQL with AES encryption.

The functional requirements are as follows:

1. User should be able to create a note.
2. User should be able to view metadata for all notes.
3. User should be able to view a note encrypted and decrypted.
4. User should be able to update a note.
5. User should be able to delete a note.

The non-functional requirements are as follows:
1. The notes should be encrypted using the AES algorithm.
2. The notes should be stored in a PostgreSQL database.
3. The API should be secured with an API key. The one who controls the API key can access the API.
4. The API should be containerized.

## Folder structure
    
    ├── src
    │   ├── secret-note
            |── dto
            |   ├── secret-note-note.dto.ts
            ├── swagger-docs
            |   ├── swagger-docs.ts
    │   │   ├── secret-note.controller.ts
    │   │   ├── secret-note.module.ts
    │   │   ├── secret-note.service.ts
    │   │   ├── secret-note.entity.ts
    │   ├── middleware
            ├── authorization.guard.ts
    │   ├── common
            ├── transform-objects.ts
    │   ├── app.module.ts
    │   ├── main.ts
    │   ├── http-exception.filter.ts
    │   ├── prisma.service.ts
    ├── test
    ├── Dockerfile
    ├── docker-compose.yml

## Technologies used
1. Node.js, NestJs
2. PostgreSQL
3. Docker
4. Swagger for API documentation
5. Prisma as the ORM
6. Jest for testing

## Installation and running the dev environment

Get the environment variables from this [dummy vault](https://drive.google.com/file/d/1uX60OzpS50a3AvFgIclIqESaiv-Q7t_k/view?usp=sharing) and copy the ```.env``` file to the root directory of the project.

#### Running the project locally
```bash
$ npm install
$ npm start:dev
```

#### Running with Docker

```bash
$ docker-compose up --build
```

this will spin up the node server and the postgres database. The server will be running on port 3000.

## API Documentation

* The API documentation can be found at ```http://localhost:3000/api-docs```

* The Architecture decision records can be found in the docs folder in markdown format.

## Testing

Run the tests with ```npm run test``` command
