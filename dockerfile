FROM node:17.9.0-alpine3.15 as build-stage
WORKDIR /app
COPY ./ ./

RUN echo "Configuring access to @s-e instance-level NPM repository..." \
&& npm config set -- "//${CI_SERVER_HOST}/api/v4/packages/npm/:_authToken" "${CI_JOB_TOKEN}" \
&& npm config set "@s-e:registry https://${CI_SERVER_HOST}/api/v4/packages/npm/"

RUN npm i
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
