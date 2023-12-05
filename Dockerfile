FROM node:18 as build

WORKDIR /app

# Copia los archivos de la aplicación
COPY ./ /app
# Instala las dependencias y compila la aplicación
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/pacasmayo-workflow-admin /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80