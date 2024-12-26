FROM node:18

ARG NODE_ENV
ARG API_HOST
ARG API_PORT
ARG API_PREFIX
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_SYNCHRONIZE
ARG DB_MAX_CONNECTIONS
ARG JWT_ACCESS_TOKEN_SECRET

RUN npm i -g pnpm

WORKDIR /test-spitzer-automation-rus-be

COPY package*.json ./

RUN  pnpm fetch
RUN  pnpm i

COPY . .

RUN  pnpm build

CMD ["sh", "-c", "pnpm migration:run && pnpm start:prod"]
