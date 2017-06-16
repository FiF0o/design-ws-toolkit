/**
 * Created by jonlazarini on 09/06/17.
 */
export const config = {
    entries: {
        css: 'main.scss',
        js: 'main.js'
    },
    server: {
        port: 34567
    },
    templates: {
        ext: '.html'
    },
    src: {
        root: './src',
        assets: './src/assets/',
        data: './src/data/',
        js: './src/js/',
        styles: './src/sass/',
        templates: './src/templates/'

    },
    dist: {
        root: './dist',
        js: './dist',
        css: './dist',
        assets: './dist/assets/',
        images: './dist/assets/images/',
        fonts: './dist/assets/fonts/',
    }
}
