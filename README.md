# Bitnation Nation Framework

## Development

### Docker
1. Get docker
2. Run `docker-compose up` to start the container's
3. Run `docker-compose exec node bash` to enter the node env. DONT RUN ANY COMMAND FROM YOUR LOCAL ENV.
4. Run `exit` to exit from the node container's
5. Run `docker-compose stop` to turn shut down the container's. 
6. Run `docker-compose start` to start the container's
7. Run `docker-compose down` to destroy the container's.
8. Run `docker-compose build` to rebuild the images (you need this when you change thing's in the Dockerfile's)

### Git 
- We are using [this](http://nvie.com/posts/a-successful-git-branching-model/) git workflow. Make sure you read it. 
- PLEASE prefix your git commit's with a topic like so: `[git] blacklisted .idea folder`
- Make SMALL commit's. It's then way better to follow your changes. 