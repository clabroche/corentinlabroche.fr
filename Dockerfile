FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /corentinlabroche.fr
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
RUN npm ci
COPY . .
ARG VUE_APP_WEATHER_APIKEY
ENV VUE_APP_WEATHER_APIKEY=$VUE_APP_WEATHER_APIKEY
RUN npm run build && rm -rf node_modules && npm ci --production

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /corentinlabroche.fr
RUN mkdir /corentinlabroche.fr/dist
COPY --from=builder /corentinlabroche.fr/node_modules ./node_modules
COPY --from=builder /corentinlabroche.fr/dist ./dist
COPY --from=builder /corentinlabroche.fr/server.js .

CMD ["node", "server"]
