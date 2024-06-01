# Use an official Node.js image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

RUN npm run build

# Expose the port
EXPOSE 3210

# Run the command to start the frontend
CMD ["npm", "run", "start:dev"]