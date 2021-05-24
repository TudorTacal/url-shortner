FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the url-shortner backend API."

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . .

EXPOSE 4000

CMD ["yarn", "start"]