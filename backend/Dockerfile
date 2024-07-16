# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory (required to install dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Expose port 5003 to the outside world
EXPOSE 5003

# Command that is run to start the app
CMD ["npm", "start"]
