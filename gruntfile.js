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
                            'bin/**/',
                            'routes/**/',
                            'views/**/',
                            'application/**/*.*',
                            'public/css/*.css',
                            'public/fonts/**/*.*',
                            'public/images/**/*.*',
                            'public/bower_components/requirejs/require.js'
                        ],
                        dest: 'production/'
                    }
                ]
            }
        },
        csso:{
            main:{
                options:{
                    restructure:true
                },
                baseUrl:"production/",
                files:[
                    {src:'production/public/css/styles.css', dest:'production/public/css/styles.css'}
                ]
            }
        },
        sass: {
            options: {
                style: '{{expanded}}'
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
        browserify: {
            dist: {
                files: {
                    'development/public/index.js': ['development/public/js/**/*.js']
                },
                options: {

                }
            },
            continuous: {
                files: {
                    'tests/indexSpec.js': ['development/public/js/**/*.js','tests/public/js/**/*.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'jshint', 'browserify', 'copy', 'uglify', 'csso']);
    grunt.registerTask('test', ['browserify:continuous','karma'])
};

