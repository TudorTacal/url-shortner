# Url Shortner App

A full stack application that provides URL shortening functionality.

![Screenshot](https://ibb.co/N3WnqgZ)

To use the app enter a valid url with protocol included e.g. `https://www.google.com` and press `Shorten`. You will receive a shortened url with a domain and a hash e.g. `https://pbid.io/ho24ipz0`

A list of previously shortened urls will be available on the page.

If the url is invalid the server will return an adequate response and a validation message will be rendered.

Similarly if a server error is encountered an error state will be rendered on the front end.

## Repo structure

- Client - CRA
- Server - Express

## To run the app

- clone the repo

Create a `.env` file at the root of the `server` package file with the following variables.
You can use my credentials for MongoDB Atlas cluster (for a limited time) or add your own credentials pointing to a different cluster.

```
MONGO_USER=Tudor
MONGO_PASSWORD=T2odidOXQC2gpVrS
MONGO_DB=urls
```

**Option 1** (with Docker - you must have docker installed locally)

- at the root of the project run `docker build`
- then `docker-compose up`
- open the app on http://localhost:3000

**Option 2** (without docker)

- install dependencies in both `client` and `server`
  - `cd client`
  - run `yarn`
  - `cd server`
  - run `yarn`
- start both the client and the server with `yarn start`
- the client will be available on http://localhost:3000
- the server will be available on http://localhost:4000

## To run the tests

- install dependencies in both client and server using `yarn`

Client

- `cd client`
- run `yarn run test` (coverage included 100%)

Server

- `cd server`
- run `yarn test` or `yarn run test:watch` (coverage included 100%)

## Tech Stack

- React
- Express
- MogoDB Atlas
- Typescript
- Docker
- Vanilla CSS
- Axios
- React Testing Library
- Supertest
