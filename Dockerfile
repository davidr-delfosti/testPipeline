FROM node:18 AS base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base AS dependencies
RUN npm ci --omit=dev
RUN cp -R node_modules prod_node_modules
RUN npm ci

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS release
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]