# generator-bangular <br> [![Build Status](https://travis-ci.org/42Zavattas/generator-bangular.svg?branch=develop)](https://travis-ci.org/42Zavattas/generator-bangular) [![Coverage Status](https://coveralls.io/repos/42Zavattas/generator-bangular/badge.svg?branch=develop)](https://coveralls.io/r/42Zavattas/generator-bangular?branch=develop) [![Code Climate](https://codeclimate.com/github/42Zavattas/generator-bangular/badges/gpa.svg)](https://codeclimate.com/github/42Zavattas/generator-bangular) [![Dependency Status](https://david-dm.org/42Zavattas/generator-bangular.svg)](https://david-dm.org/42Zavattas/generator-bangular)

![logos](logos/logos-sprite.png "logos")

***Philosophy***

> *« Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away. »* — ***Antoine De Saint-Exupéry***

* **NO** support for outdated browsers — *Working for IE users? Too bad.*
* **NO** pre-install for Google Analytics — *Wanna track people? Do it yourself.*
* **Livereload** on changes in client / server — *You don't have time to waste.*
* **JSHint** integration — *Write clean code, for purpose.*
* **Fast build** — *You do faster? Let's see that.*

[Demo of generated project](https://github.com/42Zavattas/bangular-demo)

# Install

    npm install -g yo generator-bangular
    yo bangular

# Manage project

    gulp

**Default task, run the server.** Build `sass` files, inject all scripts and styles to the project, watch them and open your default browser.

    gulp build

Wipe old generated `dist` directory while keeping the `.git` to preserve your remotes configuration. Concat all the scripts and vendors in one minified `.js` file, same thing for your styles. Rev all resources for caching purposes; copy the server part.

    gulp preview

Run the `gulp build` process and serve the `dist` directory.

    gulp test [--client || --server]

Launch client and server tests, using Karma and Mocha, both by default.

    gulp control

Validate the app through JSHint.

    gulp bump [--major || --minor || --patch]

Bump versions of `package.json` and `bower.json` files using *Semantic Versioning* and commit them. Default to **patch**.

# Generators

 - Global
  - [app](https://github.com/42Zavattas/generator-bangular#app)
 - Client
  - [directive](https://github.com/42Zavattas/generator-bangular#directive)
  - [filter](https://github.com/42Zavattas/generator-bangular#filter)
  - [font](https://github.com/42Zavattas/generator-bangular#font)
  - [route](https://github.com/42Zavattas/generator-bangular#route)
  - [service / factory](https://github.com/42Zavattas/generator-bangular#service)
  - [style](https://github.com/42Zavattas/generator-bangular#style)
 - Server
  - [api](https://github.com/42Zavattas/generator-bangular#api)

## App

This is the main generator of Bangular, that will scaffold entierely your project based on your needs.

    yo bangular || yo bangular <appName>

**Backend type**: MongoDB / [Restock](https://github.com/42Zavattas/Restock.io) / Json<br>
**Modules**     : angular-cookies || angular-resource || angular-sanitize || angular-animate<br>
**Socket.IO**   : Do you want to integrate sockets in your app?


## Directive

    yo bangular:directive <name>

The **name** parameter is required. Directives will be generated at `client/directives/`. You can specify if your directive needs an html template or not.

## Filter

    yo bangular:filter <name>

The **name** parameter is required. Filters will be generated at `client/filters/`.

## Font

    yo bangular:font <name>

The **name** parameter is required. Fonts will generate a new folder in `client/assets/fonts/` and a `.scss` file importing all of these fonts in your app.
It will be imported in your `app.scss` file either on top of the file or after the `// imports` mark if specified.

## Route

    yo bangular:route <name>

**Url**: Client url to access the route.

The **name** parameter is required. This will create in `client/views/`:

    name
    ├ name.js
    ├ name.controller.js
    ├ name.spec.js
    └ name.html

## Service

    yo bangular:service <name>
    yo bangular:factory <name>

The **name** parameter is required. The service / factory and its spec file will be generated at `client/services/`.

## Style

    yo bangular:style <name>

**Inject**: If true, an `@import` will be added to the main *app.scss* file to add the style to your app.
You can specify the location of your new imports by adding a `// imports` in the file.

The **name** parameter is required. This will create a new `.scss` file in he `client/styles/` folder.

## Api

    yo bangular:api <name>

**Url**: Route that will be exposed on your server to access this ressource.<br>
**Socket**: If you want to emit socket event on model changes.

The **name** parameter is required. A **name** folder will be created at `server/api/`.

# Features

### Sockets

To use the sockets, you have to confirm the option on project generation.
Yet, it's only when you've selected the mongo backend that you can be prompted by this config.

This will initialize all the server part and create a `Socket` factory in the client.
On each new `api` you create, you can choose to load the sockets for this model.
It will then emit socket events on update and remove of documents of this model.

The sockets can be quickly usable in your controllers, [here is an example](https://gist.github.com/Apercu/9cd8b4b332948dc833f0) with a simple user.

### Passport

On project generation, you can integrate passport authentification in your app. It will create default views for the signup and login. You can easily protect your routes for a connected user by adding the `isAuthenticated` middleware on it.


# Architecture

    client
     ├ assets
     │   ├ images/
     │   └ fonts/
     ├ styles/
     ├ views/
     ├ directives/
     ├ filters/
     ├ services/
     ├ bower_components/
     ├ index.html
     ├ app.js
     └ karma.conf.js
    server
     ├ api/
     ├ config/
     ├ routes.js
     └ server.js
    gulpfile.js
    bower.json
    package.json
    .yo-rc.json
    .jshintrc


## License

BSD
