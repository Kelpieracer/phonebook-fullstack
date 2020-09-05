FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && npm install typescript -g && mv node_modules ../
COPY . .
RUN tsc
EXPOSE 3000 3001 9229
CMD ["npm", "start"]