/**
 * Created by jonlazarini on 09/06/17.
 */
export const config = {
    server: {
        port: 3456
    },
    templates: {
        ext: '.mustache'
    },
    src: {
        root: './src',
        assets: './src/assets/',
        data: './src/data/',
        js: './src/js/',
        styles: 'sass',
        templates: './src/templates/'

    },
    dist: {
        root: './dist',
        js: './dist',
        css: './dist',
        assets: './assets/',
        images: './dist/assets/images/',
        fonts: './dist/assets/fonts/',
    }
}
