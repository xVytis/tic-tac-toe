FROM node:14-alpine as build

ENV NODE_ENV production
ENV MODE production

WORKDIR /home/node
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock .
COPY package*.json .
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY webpack/ ./webpack
COPY packages/front-end ./packages/front-end

RUN yarn
RUN yarn workspace front-end build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /home/node/packages/front-end/dist/ ./

WORKDIR /etc/nginx/conf.d
RUN rm -rf ./*
COPY packages/front-end/nginx/conf.d/ /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
