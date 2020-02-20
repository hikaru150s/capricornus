# base image
FROM node:12.14.1

# set working directory
WORKDIR /backend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /backend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /backend/package.json
RUN npm install

# add app
COPY . /backend

# run app
CMD ["npm", "start"]
EXPOSE 8000
