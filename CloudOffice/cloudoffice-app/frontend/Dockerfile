# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Don't copy source files here for dev — use volume instead
# # Copy the rest of the application code to the working directory
# COPY . .

# Do not build the Next.js application here for dev — use volume instead
# # Build the Next.js application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
