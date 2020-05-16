# Use a lighter version of Node as a parent image
FROM node:12.16.3-alpine

RUN mkdir -p /src/app

# Set the working directory to /client
WORKDIR /src/app
# Copy the current directory contents into the container at /client
COPY . /src/app
# install dependencies
RUN npm install
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]

