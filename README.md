[//]: # (<p align="center">)

[//]: # (  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>)

[//]: # (</p>)

[//]: # ()
[//]: # ([circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)

[//]: # ()
[//]: # ([circleci-url]: https://circleci.com/gh/nestjs/nest)

[//]: # ()
[//]: # (  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>)

[//]: # (    <p align="center">)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>)

[//]: # (<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>)

[//]: # (<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>)

[//]: # (<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>)

[//]: # (<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>)

[//]: # (<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>)

[//]: # (  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>)

[//]: # (    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>)

[//]: # (  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>)

[//]: # (</p>)

[//]: # (  <!--[![Backers on Open Collective]&#40;https://opencollective.com/nest/backers/badge.svg&#41;]&#40;https://opencollective.com/nest#backer&#41;)

[//]: # (  [![Sponsors on Open Collective]&#40;https://opencollective.com/nest/sponsors/badge.svg&#41;]&#40;https://opencollective.com/nest#sponsor&#41;-->)

## Description

 Test work with [Nest](https://github.com/nestjs/nest) by Oleksandr Vitvitsky (Jan 2024)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# create a new database (postgres/redis)
$ npm run start:docker:db

# create migrations
$ npm run migration:generate -name=add_metadataToDB

# run migrations
$ npm run migration:run

# watch mode
$ npm run start:local
# .env file are located in the project in the folder environments

# if you want to create a new cars in DB, you need to login with role 'admin' and 
# use email "admin@admin.com" with password "123qwe!@#QWE" and use endpoint /cars/create-cars with POST method and body:[] (empty array)





```

- Author - [Oleksandr Vitvitsky](https://www.linkedin.com/in/oleksandr-vitvitsky-421555260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
