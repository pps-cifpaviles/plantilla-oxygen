# syntax=docker/dockerfile:1
# Frontend de Oxygen (React, Create React App) servido con nginx sin privilegios

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# La URL de la API se incrusta en el JavaScript al compilar
ARG REACT_APP_API_ENDPOINT=http://localhost:8000/api
ENV REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT}
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
