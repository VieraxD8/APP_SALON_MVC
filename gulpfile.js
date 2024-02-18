const { src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber =require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//java

const terser = require('gulp-terser-js');

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require("gulp-webp");
const avif = require('gulp-avif');

//cache

const cachebust = require('gulp-cache-bust');

function caches(callback){
    
    src('**/*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(dest('.'));

    callback();

}

function css(callback){

    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( plumber())
        .pipe( sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('public/build/css'))


    callback();
}

function versionWebp(callback){

    const opcion = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opcion))
        .pipe(dest('public/build/img'))

    callback();
}

function imagenes(callback){


    const opcion = {

        optimizationLevel: 3
    }


    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opcion)) )
        .pipe( dest('public/build/img'))


    callback();
}


function versionavif(callback){

    const opcion = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opcion))
        .pipe(dest('public/build/img'))

    callback();
}

function javascript(callback){

    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public/build/js'))


    callback();
}

function dev(callback){

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
        


    callback();
}


exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionavif = versionavif;
exports.caches = caches;
exports.js = javascript;
exports.dev = parallel( css, caches, javascript, versionavif, imagenes, versionWebp ,dev);
exports.build = parallel( css, caches, javascript, versionavif, imagenes, versionWebp ,dev);

