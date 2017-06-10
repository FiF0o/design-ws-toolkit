/**
 * Created by jonlazarini on 09/06/17.
 */
import fs from 'fs';
import path from 'path';
import del from 'del';
import gulp from 'gulp';
import {gulpServer} from './scripts/server'
import {config} from './config';

const templates = fs.readdirSync(path.resolve(__dirname, config.src.templates)).filter(fname => fname.match(`${config.templates.ext}`))

// starts webserver
gulpServer(gulp)

gulp.task('clean', (cb) => {
    del.sync([path.resolve(__dirname, config.dist.root, '*')], {force: true})
    cb()
})

gulp.task('default', ['clean', 'start:server'], () => console.log('Default task'))
