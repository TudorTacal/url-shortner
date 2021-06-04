# Url Shortner App

A full stack application that provides URL shortening functionality.

![Screenshot 2021-05-27 at 21 37 29](https://user-images.githubusercontent.com/19284939/119897516-69db8500-bf38-11eb-98d5-a429f83c1a92.png)

To use the app enter a valid url with protocol included e.g. `https://www.google.com` and press `Shorten`. You will receive a shortened url with a domain and a hash e.g. `https://pbid.io/ho24ipz0`

A list of previously shortened urls will be available on the page.

If the url is invalid the server will return an adequate response and a validation message will be rendered.

Similarly if a server error is encountered an error state will be rendered on the front end.

## Repo structure

- Client - CRA
- Server - Express

## To run the app

Please set node version to v12.16.1

- clone the repo

Create a `.env` file at the root of the `server` package file with the following variables.
You need to define credentials for the MongoDB Atlas cluster.

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_DB=
```

**Option 1** (with Docker - you must have docker installed locally)

- at the root of the project run `docker-compose build`
- then `docker-compose up`
- open the app on http://localhost:3000

**Option 2** (without docker)

- install dependencies in both `client` and `server`
  - `cd client`
  - run `yarn`
  - `cd server`
  - run `yarn`
- `cd server` & `yarn run build`
- start both the client and the server with `yarn start`
- the client will be available on http://localhost:3000
- the server will be available on http://localhost:4000

## To run the tests

- install dependencies in both client and server using `yarn`

Client

- `cd client`
- run `yarn run test`
  <img width="692" alt="Screenshot 2021-05-27 at 22 10 00" src="https://user-images.githubusercontent.com/19284939/119897543-795ace00-bf38-11eb-8294-f785161bec23.png">

Server

- `cd server`
- run `yarn test` or `yarn run test:watch` (watch generates the coverage report)
  <img width="961" alt="Screenshot 2021-05-27 at 00 19 52" src="https://user-images.githubusercontent.com/19284939/119897546-7bbd2800-bf38-11eb-8a05-040a679d39e2.png">

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

### Improvement opportunities

On the FE the server error `Something went wrong` is generic and I didn't go overboard with the message or the styling. It will be rendered if the GET or POST requests fail.

As it stands a shortened link can be shortened again; ideally the server should prevent this from happening but I had to stop development at some point and it wasn't in the original requirements either.
