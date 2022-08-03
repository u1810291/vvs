FROM node:17.9.0-alpine3.15 as build-stage
WORKDIR /app
COPY ./ ./

RUN npm config set -- "//gitlab.com/api/v4/projects/32043140/packages/npm/:_authToken" "L8ZEVWqV8ADcUWuRvRGf" \
&& npm config set @s-e:registry https://gitlab.com/api/v4/projects/32043140/packages/npm/ \
&& npm config set always-auth true

RUN npm i
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
