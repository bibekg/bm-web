# Load the alpine base image
FROM alpine:3.7

# Install dependencies
RUN apk update && apk add -U nginx python nodejs

# Create directories
#   /working is the build directory
#   /static is the directory linked to nginx
RUN mkdir -p /var/www/web/working && mkdir -p /var/www/web/static

# Copy entire current directory into working directory
COPY * /var/www/web/working/

# Run npm install to download all the project dependencies
RUN cd /var/www/web/working && npm install

# Set the working directory
WORKDIR /var/www/web/working

# Build and copy files to server root
ARG node_environment=development
ENV NODE_ENV=$node_environment
RUN npm run build && cp -r public/ /var/www/web/static/
COPY index.html /var/www/web/static/

# Copy nginx configuration files
RUN mkdir -p /run/nginx
COPY conf/ /etc/nginx/
RUN mv /etc/nginx/ssl.$node_environment.conf /etc/nginx/ssl.conf
WORKDIR /var/www/web/static

# Expose a port and start the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
