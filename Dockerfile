FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8083
CMD [ "node", "index.js"]

# docker build -t simple-favorite-list .
# docker pull mongo

# Have to set name of the image to mongo_node in order to work with express_node by setting host of mong_node
# docker run --name mongo_node --network mynet -p 27017:27017 -d mongo
# docker run --name express_node --network mynet -p 8083:8083 -e HOST=mongo_node simple-favorite-list