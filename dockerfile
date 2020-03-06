FROM node:current-slim
WORKDIR /usr/src/app/client
COPY ./client .
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/server
COPY ./server .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]