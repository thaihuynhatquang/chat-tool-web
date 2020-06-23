# build environment
FROM node:10.15-alpine as builder

ARG IMAGE_TAG_ARG='m-default'
ENV REACT_APP_IMAGE_TAG=${IMAGE_TAG_ARG}

RUN apk update && apk upgrade && apk add bash && apk add git

ARG NODE_ENV=$NODE_ENV

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package-lock.json /usr/src/app/package-lock.json
COPY package.json /usr/src/app/package.json

RUN npm install

COPY . /usr/src/app

RUN NODE_ENV=$NODE_ENV npm run build
