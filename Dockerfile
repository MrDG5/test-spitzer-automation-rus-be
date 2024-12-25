FROM node:18

RUN npm i -g pnpm

WORKDIR /test-spitzer-automation-rus-be

COPY package*.json ./

RUN  pnpm fetch
RUN  pnpm i

COPY . .

RUN  pnpm build

CMD ["sh", "-c", "pnpm migration:run && pnpm start:prod"]
