FROM node:14

WORKDIR /aora-app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

