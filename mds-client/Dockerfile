FROM node:16.14.2-alpine3.15


COPY package.json tsconfig.json provider_BSE_status_changes_20220708T050000Z_20220708T210000Z.json index.ts ./ 

RUN npm install -g typescript && npm install
     
RUN tsc

CMD node index.js

