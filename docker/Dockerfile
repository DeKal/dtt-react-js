
#Stage 1 - using node js as a build tool
FROM node:11.10 as react-build

#Set WORKDIR = /app, so ./ refer to /app
WORKDIR /app

#Copy source to WORKDIR
COPY . ./

#Build source
RUN npm install
RUN mkdir -p dist/
RUN npm run webpack

# Stage 2 - the production environment
FROM nginx:alpine
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
#copy from build source to nginx
COPY --from=react-build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
