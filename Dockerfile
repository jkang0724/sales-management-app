# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app
# copy .npmrc to get npm packages
# COPY .npmrc ./

# copy package*.json
COPY package*.json ./

# install npm dependencies
RUN npm ci

# clean up the npmrc files
# RUN rm .npmrc

# copy other project files except in .dockerignore
COPY . ./

# describe the container is listening on port 3000
EXPOSE 3000

RUN npm run build
# start container with npm run server
CMD [ "npm", "run", "server" ]