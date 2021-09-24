FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install required npm packages
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose app
EXPOSE 3002

CMD [ "node", "./build/app.js" ]