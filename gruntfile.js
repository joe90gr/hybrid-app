module.exports = function(grunt) {
    var browserifyConfig = grunt.file.readJSON('browserify-config.json');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'development/',
                        src: [
                            'index.js',
                            'bin/**/*',
                            'config/**/*',
                            'routes/**/*',
                            'views/**/*.*',
                            'views/**/**/.*',
                            'public/main-client-app/css/*.css',
                            'public/main-client-app/assets/**/*.*'

                        ],
                        dest: 'production/'
                    }
                ]
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            dist: {
                files: {
                    'development/public/main-client-app/css/styles.css': 'development/public/main-client-app/css/sass/styles.scss'
                }
            }
        },
        jshint: {
            all: [
                'development/public/main-client-app/js/**/*.js'
            ],
            options:{
                strict: false
            }
        },
        watch: {
            sass: {
                files: ['development/public/main-client-app/css/sass/*.scss'],
                tasks: ['sass'],
                options: { debounceDelay: 250 }
            },
            js: {
                files: [
                    'development/public/**/*.js',
                    'development/public/*.js'
                ],
                tasks: ['jshint', 'browserify'],
                options: { debounceDelay: 250 }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'production/public/index.js': ['development/public/index.js' ]
                }
            }
        },
        hogan: {
            target : {
                src : 'development/views/**/*.hjs',
                dest : 'development/views/compiled-hogan.js',
                options : { binderName: 'nodejs' }
            }
        },
        react: {
            single_file_output: {
                files: {
                    'development/views/compiled-react.js': 'development/views/**/*.jsx'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'development/public/index.js': [
                        'development/public/main-client-app/js/**/*.js'
                    ]
                },
                options: browserifyConfig
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome']
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                autoWatch: false,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-hogan');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build',  ['sass', 'jshint', 'hogan', 'react', 'browserify', 'copy']);
    grunt.registerTask('default', ['sass', 'jshint', 'hogan', 'react', 'karma:continuous', 'browserify', 'copy', 'uglify']);
};

