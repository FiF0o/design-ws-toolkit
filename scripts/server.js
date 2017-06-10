/**
 * Created by jonlazarini on 10/06/17.
 */
import connect from 'gulp-connect';
import open from 'gulp-open';

import {config} from '../config';

export const gulpServer = (gulp) => {

    // creates server
    gulp.task('server', () => {
        connect.server({
            root: 'dist',
            livereload: true,
            port: config.server.port
        })
    })

    gulp.task('open', () => {
        gulp.src('')
            .pipe(open({uri: `http://localhost:${config.server.port}`}))
    })

    return gulp.task('start:server', ['server'], (cb) => gulp.start('open', cb))

}
