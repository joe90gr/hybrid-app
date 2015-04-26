module.exports = function(grunt) {
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
                            'routes/**/*',
                            'public/css/*.css',
                            'public/fonts/**/*',
                            'public/images/**/*',
                            'public/views/**/*'
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
                    'development/public/css/styles.css': 'development/public/css/sass/styles.scss'
                }
            }
        },
        jshint: {
            all: [
                'development/public/js/**/*.js'
            ],
            options:{
                strict: false
            }
        },
        watch: {
            sass: {
                files: ['development/public/css/sass/*.scss'],
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
        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'development/public/react-views/jsx',
                        src: ['**/*.jsx'],
                        dest: 'development/public/react-views/transpiled-jsx',
                        ext: '.js'
                    }
                ]
            }
        },
        browserify: {
            dist: {
                files: {
                    'development/public/index.js': ['development/public/js/**/*.js']
                },
                options: {
                    transform:  [
                        require('grunt-react').browserify
                    ]
                }
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build',  ['sass', 'jshint', 'react', 'browserify', 'copy']);
    grunt.registerTask('default', ['sass', 'jshint', 'react', 'karma:continuous', 'browserify', 'copy', 'uglify']);
};

