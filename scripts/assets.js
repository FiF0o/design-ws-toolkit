/**
 * Created by jonlazarini on 11/06/17.
 */
export const assets = (gulp, config) => {
    return () => {
        //TODO Add asset transform tasks later
        return gulp.src(`${config.src.assets}/**`)
            .pipe(gulp.dest(`${config.dist.assets}`))
    }
}