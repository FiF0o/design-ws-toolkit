/**
 * Created by jonlazarini on 10/06/17.
 */
import connect from 'gulp-connect';
import open from 'gulp-open';

export const gulpServer = (gulp, config) => {

    // creates server
    gulp.task('server', () => {
        return connect.server({
            root: 'dist',
            livereload: true,
            port: config.server.port
        })
    })

    gulp.task('open', () => {
        return gulp.src('')
            .pipe(open({uri: `http://localhost:${config.server.port}`}))
    })

    gulp.task('start:server', ['clean'], (cb) => {
        return gulp.start('server', 'open', cb)
    })

}
