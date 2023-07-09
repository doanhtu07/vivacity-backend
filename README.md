# vivacity-backend

## Env File

Normally, you would want to gitignore the .env file. But for the sake of testing, I'll leave .env file right in the repo.

## Setup

1. To fully test the API `/awesome/applicant`, you need to have Docker installed.

   a. After Docker is installed, run `yarn dock` to initialize database instance in Docker.

   b. Then, run `yarn pdev` to apply schema changes to database.

   c. Finally, run `yarn pgen` to generate types to use in Typescript code.

2. If you just want to test the API without database, call `/awesome/applicant/no-db`.

## Run

1. Run `yarn install`.

2. Run `yarn dev`.

## Requirements Check

- [x] Create a web server in TypeScript using Node and Express

- [x] Create an API endpoint at this route: “/awesome applicant” that returns some fun information about yourself

- [x] Enable CORS so that the frontend application can retrieve this information

- [x] Store this code in GitHub and add nathanbirch as a collaborator

## Stretch Challenges Check

- [x] Create a PostgreSQL database that stores the information about yourself and use it in your backend code.

- [x] Write unit tests in Jest to test your code
