// Karma configuration
// Generated on Fri Sep 13 2013 23:39:41 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['mocha','chai','sinon'],

    // list of files / patterns to load in the browser
    files: [
        //{pattern: 'development/public/js/**/*.js', included: false},
        //{pattern: 'development/js/libs/*.js', included: false},
        //'test/*Spec.js' // same as {pattern: 'test/*Spec.js', included: true},
        {pattern: 'tests/indexSpec.js', included: true}
       // {pattern: 'test/utils/**/*Spec.js', included: false},
    ],


    // list of files to exclude
    exclude: [
        //'development/js/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 10346,

      runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
