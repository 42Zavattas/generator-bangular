# generator-bangular [![Build Status](https://travis-ci.org/42Zavattas/generator-bangular.svg?branch=develop)](https://travis-ci.org/42Zavattas/generator-bangular) [![Dependency Status](https://david-dm.org/42Zavattas/generator-bangular.svg)](https://david-dm.org/42Zavattas/generator-bangular)

*Want a clean, fast and more purposed way to scaffold your project while keep at hand some build tools?*
*Don't obstruct your code with slow things. Future is here.*

***Philosophy***

> *« Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away. »* — ***Antoine De Saint-Exupéry***

* **NO** support for outdated browsers — *Working for IE users? Too bad.*
* **NO** pre-install for Google Analytics — *Wanna track people? Do it yourself.*
* **Livereload** on changes in client / server — *You don't have time to waste.*
* **JSHint** integration — *Write clean code, for purpose.*
* **Fast build** — *You do faster? Let's see that.*

[Demo of generated project](https://github.com/42Zavattas/bangular-demo)

# Install

    npm install -g generator-bangular
    yo bangular

    // profit !

# Manage generated project

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
  - [service](https://github.com/42Zavattas/generator-bangular#service)
  - [style](https://github.com/42Zavattas/generator-bangular#style)
 - Server
  - [api](https://github.com/42Zavattas/generator-bangular#api)

## App

This is the main generator of Bangular, that will scaffold entierely your project based on your needs.

    yo bangular || yo bangular <appName>

**Backend type**: MongoDB / [Restock](https://github.com/42Zavattas/Restock.io) / Json

**Modules**     :  angular-cookies || angular-resource || angular-sanitize || angular-animate


## Directive

    yo bangular:directive <name>

The **name** parameter is required. Directives will be generated at `client/directives/`. You can specify if your directive needs an html template or not.

## Filter

    yo bangular:filter <name>

The **name** parameter is required. Filters will be generated at `client/filters/`.

## Font

    yo bangular:font <name>

The **name** parameter is required. Fonts will generate a new folder in `client/assets/fonts/` and a `.scss` file importing all of these fonts in your app.

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

The **name** parameter is required. The service and its spec file will be generated at `client/services/`.

## Style

    yo bangular:style <name>

**Inject**: If true, an `@import` will be added to the main *app.scss* file to add the style to your app.
In case you have a weird workflow, you can specify the location of your new imports by adding a `// imports` in the file.

The **name** parameter is required. This will create a new `.scss` file in he `client/styles/` folder.

## Api

    yo bangular:api <name>

**Url**: Route that will be exposed on your server to access this ressource.

The **name** parameter is required. A **name** folder will be created at `server/api/`.


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
