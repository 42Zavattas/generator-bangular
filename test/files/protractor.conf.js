exports.config = { // jshint ignore:line

  seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  chromeDriver: './node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',

  baseUrl: 'http://localhost:9000',

  multiCapabilities: [{
    name: 'Bangular generator e2e tests Chrome',
    browserName: 'chrome',
    build: process.env.CIRCLE_BUILD_NUM
  }, {
    name: 'Bangular generator e2e tests Firefox',
    browserName: 'firefox',
    build: process.env.CIRCLE_BUILD_NUM
  }],

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }

};
