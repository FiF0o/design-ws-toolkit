/**
 * Created by jonlazarini on 09/06/17.
 */
import fs from 'fs';
import path from 'path';
import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import chalk from 'chalk';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

import assign from 'lodash/assign';

import {gulpServer} from './scripts/server';
import {assets} from './scripts/assets';

import {config} from './config';


/** Utils **/
const onError = (err) => {
    let error = chalk.bold.red
    console.log(error(err))
    this.emit('end')
}


/**
 * Add external gulp scripts - Make them available in our main file
 */
// gets webserver gulp task
gulpServer(gulp, config)


/** Clean **/
gulp.task('clean', () => {
    // tells gulp clean is done for our next async function - cb - next function
    return del.sync([path.resolve(__dirname, config.dist.root, '*')], {force: true})
})


/** Styles **/
gulp.task('sass', () => {
    const sassOpts = {
        outputStyle: 'compressed'
    }
    return gulp.src(`${config.src.styles}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass(
            sassOpts
        ))
        .on('error', onError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist.root))
})


const extraWatchifyArgs = {
    entries: [`${config.src.root}/${config.entries.js}`],
    debug: true,
    shim: {
        jquery: {
            path: '/node_modules/jquery/dist/jquery.js',
            exports: '$'
        }
    }
}
/** JS **/
const browserifyOpts = assign({}, watchify.args, extraWatchifyArgs)
const bundler = watchify(browserify(browserifyOpts))
// add transformations here
bundler.transform(babelify, {presets: ['es2015']});
//// shimmed in package.json browserify-shim
// b.transform(['browserify-shim']);
const bundle = () => {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, chalk.bold.red('Browserify error')))
        // source bundler from browserify - main.js
        .pipe(source(`${config.entries.js}`))
        .pipe(buffer())
        .pipe(gulp.dest(config.dist.root))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.root))
}
bundler.on('update', bundle)
bundler.on('log', gutil.log)
gulp.task('js', bundle)


/** Templates **/
const templates = fs.readdirSync(path.resolve(__dirname, config.src.templates)).filter(fname => fname.match(`${config.templates.ext}`))


/** Assets **/
gulp.task('assets', assets(gulp, config))


/** Start **/
gulp.task('default', ['clean', 'start:server'])
