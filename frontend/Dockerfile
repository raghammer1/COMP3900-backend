# # # Use an official Node.js runtime as a parent image
# # FROM node:14

# # # Set the working directory inside the container
# # WORKDIR /app

# # # Copy package.json and package-lock.json to the working directory (required to install dependencies)
# # COPY package*.json ./

# # # Install dependencies
# # RUN npm install

# # # Copy all files from the current directory to the working directory
# # COPY . .

# # # Expose port 3000 to the outside world
# # EXPOSE 3000

# # # Command that is run to start the app
# # CMD ["npm", "start"]

# # Use an official Node runtime as a parent image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /app

# # Copy the current directory contents into the container at /app
# COPY . /app

# # Install any needed packages specified in package.json
# RUN npm install

# # Make port 3000 available to the world outside this container
# EXPOSE 3000

# # Run react-scripts start when the container launches
# CMD ["npm", "start"]


# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json /app/

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the current directory contents into the container at /app
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run react-scripts start when the container launches
CMD ["npm", "start"]
