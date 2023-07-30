# Use a base image
FROM nginx:latest
  
RUN apt-get update && apt-get install -y mc iputils-ping

# Copy the new HTML file to the container
#COPY assets/build/index.html /usr/share/nginx/html
COPY assets/build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]


#FROM node:11 as base
#
#WORKDIR /usr/src
#
#FROM base as dev
#
#FROM base as build

#COPY . .
#COPY .docker/app/prod.json config/json/prod.json
#RUN npm install
#RUN npm run build
#
#FROM nginx:1.17-alpine as prod

#COPY --from=build /usr/src/dist /srv

#RUN rm -f /etc/nginx/conf.d/default.conf
#COPY .docker/app/nginx.conf /etc/nginx/nginx.conf
#COPY .docker/app/nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf