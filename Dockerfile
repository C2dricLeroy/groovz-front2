# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts as build

RUN npm install -g http-server

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]