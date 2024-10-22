# Use the official Node.js image
FROM node:20.14.0 AS build

# Set the working directory
WORKDIR /app

# Clean the npm cache
RUN npm cache clean --force

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight image to serve the app
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Install serve globally
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Command to run the app
CMD ["serve", "-s", "build", "-l", "80"]
