FROM node:18

RUN npm i -g pnpm

WORKDIR /test-spitzer-automation-rus-be

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./



# Копируем все файлы приложения
COPY . .

# Устанавливаем зависимости + миграции + собираем проект
RUN  pnpm fetch
RUN  pnpm i
RUN  pnpm build
RUN  pnpm migration:run

# Команда для запуска приложения
CMD ["pnpm", "start:prod"]
