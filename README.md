### build

1. yarn dockerbuild 
docker tag discord-za-sirotinju-fe-nextjs-app:latest abralic98/discord-za-sirotinju-fe-nextjs-app:latest
docker push abralic98/discord-za-sirotinju-fe-nextjs-app:latest


### hetzner

1. docker pull abralic98/discord-za-sirotinju-fe-nextjs-app:latest
2. docker run -d -p 3000:3000 --env-file .env.production abralic98/discord-za-sirotinju-fe-nextjs-app:latest
