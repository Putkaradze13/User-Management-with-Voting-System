FROM node:alpine
COPY . .
WORKDIR /task20-rest
RUN npm ci
CMD ["npm", "start"]
