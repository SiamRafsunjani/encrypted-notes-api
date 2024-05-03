## Design records for the project

1. For the encryption algorithm, I chose AES-256-CBC. The reason for this is that it is a symmetric encryption algorithm that is widely used, a standard practice and is considered secure. It is also supported by the Node.js crypto module. The key and IV are generated using the crypto module in Node.js. The key is stored in the environment variables and is base64 encoded. The IV is generated for each note and is stored in the database. The key and IV are used to encrypt and decrypt the notes. The encrypted notes are stored in the database.

2. For the database, I chose PostgreSQL. The reason for this is that it is a widely used relational database that is secure and has good performance. It is also supported by Prisma, which is the ORM used in this project. Prisma is used to interact with the database. The database schema is defined using Prisma and the database is created using the Prisma CLI.