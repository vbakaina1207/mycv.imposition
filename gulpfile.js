// *************************************************************************************** //
// ********************* Список подключенных модулей (плагинов) Gulp ********************* //
// *************************************************************************************** //

// Собственно сам Gulp
const gulp = require('gulp');

// Модуль (плагин) для очистки директории
const cleans = require('del');

// Модуль (плагин) для конкатенации (объединения файлов)
const concat = require('gulp-concat');

// Модуль (плагин) для очистки и минификации файлов CSS
const cleanCSS = require('gulp-clean-css');

// Модуль (плагин) для очистки и минификации файлов JS
const uglify = require('gulp-uglify-es').default;

// Модуль (плагин) для расстановки автопрефиксов в CSS
const autoprefixer = require('gulp-autoprefixer');

// Модуль (плагин) для отслеживания изменений в файлах
const browserSync = require('browser-sync').create();

// Модуль (плагин) для вставки темплейтов
const rigger = require('gulp-rigger');

// Модуль (плагин) для оптимизации изображений .jpg .png
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');

// *************************************************************************************** //
// ************************************** Константы ************************************** //
// *************************************************************************************** //

// Получаем список файлов CSS и определяем их порядок подключения
const cssFiles = [
    './src/css/style.css',
    './src/css/media.css'
];

// Получаем список файлов JS и определяем их порядок подключения
const jsFiles = [
    './src/js/main.js'
];

// Получаем список файлов для копирования
const src = {
    copy_files: [
        'src/*.html',
        //'src/fonts/*',
        //'src/img/*',
        'src/uploads/*',
        'src/*.php',
    ]
};

// Получаем список файлов для отслеживания изменения HTML
const htmlFiles = [
    './src/*.html'
];

// Получаем список файлов для отслеживания изменения HTML
const phpFiles = [
    './src/*.php'
];


// *************************************************************************************** //
// *************************************** Функции *************************************** //
// *************************************************************************************** //

// Функция на стили CSS
function styles() {
    return gulp.src(cssFiles)

        // Конкатенация (Объединения) файлов CSS
        .pipe(concat('style.css'))

        // Добавить префиксы
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: false
        }))

        // Минификация CSS
        .pipe(cleanCSS({
            level: 2
        }))

        // Копирование CSS в папку build
        .pipe(gulp.dest('./build/css'))

        // Отслеживания изменения CSS
        .pipe(browserSync.stream())
}

// Функция на скрипты JS
function scripts() {
    return gulp.src(jsFiles)

        // Конкатенация (Объединения) файлов CSS
        .pipe(concat('script.js'))

        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))

        // Копирование JS в папку build
        .pipe(gulp.dest('./build/js'))

        // Отслеживания изменения JS
        .pipe(browserSync.stream())
}

// Optimize images
function img() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));
}


// Функция на файлы HTML
function files() {
    return gulp.src(htmlFiles)
        // Прогоним через rigger
        .pipe(rigger())

        // Копирование HTML в папку build
        .pipe(gulp.dest('./build/'))
}

// Функция на файлы php
function filesPhp() {
    return gulp.src(phpFiles)
        // Прогоним через rigger
        .pipe(rigger())

        // Копирование Php в папку build
        .pipe(gulp.dest('./build/'))
}

// Удалить всё в указанной папке
function clean() {
    return cleans(['build/*'])
}


// Просматривать файлы
function watch() {
    // Инициализация сервера
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    // Следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles);

    // Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts);

    // Следить за HTML файлами
    gulp.watch("./src/*.html", files);
    gulp.watch("./src/**/*.html", files);

    // Следить за php файлами
    gulp.watch("./src/*.php", filesPhp);

    // При изменении HTML запустить синхронизацию
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
}


// *************************************************************************************** //
// **************************************** Таски **************************************** //
// *************************************************************************************** //

// Таск вызывающий функцию styles
gulp.task('styles', styles);

// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск для очистки папки build
gulp.task('cleans', clean);

// Таск для копирование файлов в build
gulp.task('copyFiles', function () {
    return gulp.src(src.copy_files)
        // Прогоним через rigger
        .pipe(rigger())

        .pipe(gulp.dest(function (file) {
            let path = file.base;
            return path.replace('src', 'build');
        }));
});

// Таск для копирование шрифтов
gulp.task('copyFonts', function () {
    return gulp.src('src/fonts/**/*')

        .pipe(gulp.dest('./build/fonts/'))
});

// Таск для копирование favicon
gulp.task('copyFavicon', function () {
    return gulp.src('src/favicon.ico')

        .pipe(gulp.dest('./build/'))
});


// Таск для отслеживания изменений
gulp.task('watch', watch);

// Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, img, "copyFiles", "copyFonts", "copyFavicon")));

// Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'));