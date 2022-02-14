FROM node:14-alpine as build

ENV NODE_ENV production
ENV MODE production

WORKDIR /home/node
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock .
COPY package*.json .
COPY tsconfig.json .
COPY packages/back-end ./packages/back-end

RUN yarn
RUN yarn workspace back-end build


FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=build /home/node/package*.json ./
COPY --from=build /home/node/node_modules/ ./node_modules/
COPY --from=build /home/node/packages/back-end/dist/ .

CMD ["node", "main.js"]
