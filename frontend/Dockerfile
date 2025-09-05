# Set the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy requirements.txt to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining files to the working directory
COPY . .

# Build the application
RUN npm run build

# Set the network port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]