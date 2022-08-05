FROM node:16.14.2-alpine3.15


COPY package.json tsconfig.json provider_status_changes.json index.ts ./ 

RUN npm install
     
ENTRYPOINT ["npm", "start"]

