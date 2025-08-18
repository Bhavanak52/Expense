# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app source
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
