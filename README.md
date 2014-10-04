# generator-bangular

*Want a clean, fast and more purposed way to scaffold your project while keep at hand some build tools?*

# Install

    npm install -g generator-bangular
    
# Launch


# Generators

 - Global
  - [app](https://github.com/42Zavattas/generator-bangular#app)
 - Client
  - [directive](https://github.com/42Zavattas/generator-bangular#directive)
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
     ├ bower_components/
     ├ index.html
     ├ app.js
     └ karma.conf.js
    server
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
