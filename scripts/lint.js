/**
 * Created by jonlazarini on 11/06/17.
 */
import esLint from 'gulp-eslint';
import sassLint from 'gulp-eslint';
// import plumber from 'gulp-plumber';


export const lint = (gulp, config) => {

    gulp.task('lint:js', () => {
        return gulp.src([`${config.src.root}/**/*.js`])
            .pipe(esLint())
            // .pipe(plumber())
            .pipe(esLint.format())
            //// returns the stream, process exit error code 1 on lint error
            .pipe(esLint.failAfterError())
            // tells node it errored
            .on('error', (err) => console.log(err))
    })

    gulp.task('lint:sass', () => {
        let sassOpts = {
            options: {
                configFile: '.scss-lint.yml'
            }
        }
        return gulp.src(`${config.src.styles}/**/*.s+(a|c)ss`)
            .pipe(sassLint(sassOpts))
            .pipe(sassLint.format())
            .pipe(sassLint.failAfterError())
    })

    gulp.task('lint:all', () => gulp.start('lint:js', 'lint:sass'))

}
