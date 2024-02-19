
# Backend Developer Technical Assessment

Job posting management API built in Node.js using DDD(Domain-Driven Design), Clean code and Lambda functions to interact with AWS S3 and AWS SQS.
## Dependencies

Run this command to install dependences.

```bash
  npm install
```
    
## Docker
Run this command to lauch PostgreSQL container.
```bash
  docker compose up -d
```

## Migrations
Run this command to create database columns.
```bash
  npx prisma migrate deploy
```

## Companies pre-populate
Run this command to create pre-established companies in models.sql file.
```bash
  npx prisma db seed
```
## Tests
### Unit
Run this command to execute unit tests.

```bash
  npm run test
```
### E2E
Run this command to execute E2E tests.

```bash
  npm run test:e2e
```
## Lambda functions

### Jobs Feed
Run this commands to install dependencies and launch jobs feed local server.
This server will execute a function every 1 minute uploading a published job postings JSON file to AWS S3.

```bash
  cd feed-lambda
```

and

```bash
  npm install
```

and

```bash
  sls offline
```

### Job posting harmfull content check with OpenAI API

Run this commands to install dependencies and launch local server. This server will execute a function that will listen AWS SQS and it receives a job posting as parameter in every "/job/:job_id/publish" api calls. Using OpenAI moderation, the functions will check if there is any harmfull content in title and description. If it has, the post won't be published.

```bash
  cd job-posting-check-lambda
```

and

```bash
  npm install
```

and

```bash
  sls offline
```
## Server

Run this command to launch Express.js server.

```bash
  npm run dev
```