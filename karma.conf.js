// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// karma.conf.js
process.env.CHROME_BIN = require('puppeteer').executablePath();
// process.env.CHROME_BIN = '/usr/bin/google-chrome';
// process.env.CHROME_BIN = '/usr/bin/google-chrome-stable';
process.env.CHROME_LOG_FILE = 'chrome_debug.log'; // or by setting the env at OS level before running Karma.

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ng-custom-unsub'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    // logLevel: config.LOG_INFO,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    // browsers: ['Chrome'],
    browser: 'ChromeHeadless',
    browserNoActivityTimeout: 120000,
    browserDisconnectTimeout: 120000,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          // '--remote-debugging-port=9222',
          // '--enable-logging=stderr --v=1 2>&1'
          '--disable-web-security',
          '--disable-software-rasterizer',
          '--ignore-gpu-blocklist',
          // '--enable-logging=stderr',
          // '--v=1'
        ],
        debug: true
      },
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
