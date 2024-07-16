# # # Use an official Node.js runtime as a parent image
# # FROM node:14

# # # Set the working directory inside the container
# # # WORKDIR /app

# # # Copy package.json and package-lock.json to the working directory (required to install dependencies)
# # COPY package*.json ./

# # # Install dependencies
# # RUN npm install

# # # Copy all files from the current directory to the working directory
# # COPY . .

# # # Expose port 3005 to the outside world
# # EXPOSE 3000

# # # Command that is run to start the app
# # CMD ["npm", "start"]
# # Use an official Node.js runtime as a parent image
# FROM node:14 

# # Set the working directory inside the container
# # WORKDIR /app

# # Copy package.json and package-lock.json to the working directory (required to install dependencies)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all files from the current directory to the working directory
# COPY . .

# # Build the application
# # RUN npm run build

# # Stage 2: Use a lighter image for serving the application
# FROM node:14-alpine

# # Set the working directory inside the container
# # WORKDIR /app

# # Copy the build output from the build stage to the final stage
# # COPY --from=build /app/build ./build

# # Expose port 3000 to the outside world
# EXPOSE 3000

# # Command that is run to start the app
# CMD ["npm","start"]
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
# WORKDIR /app

# Copy package.json and package-lock.json to the working directory (required to install dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all files from the current directory to the working directory
COPY . .

# Expose port 3005 to the outside world
EXPOSE 3000

# Command that is run to start the app
CMD ["npm", "start"]
