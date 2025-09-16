### STAGE 1: Build ###

# Use a Node.js image to build the React app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application for production
RUN npm run build

### STAGE 2: Production ###

# Use a lightweight Nginx image for serving static files
FROM nginx:stable-alpine

# Copy the built files from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]