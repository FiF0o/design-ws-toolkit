/**
 * Created by jonlazarini on 09/06/17.
 */
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';

import {config} from './config';

const templates = fs.readdirSync(path.resolve(__dirname, config.src.templates)).filter(fname => fname.match(`${config.templates.ext}`))

gulp.task('default', () => console.log('Default task'))
