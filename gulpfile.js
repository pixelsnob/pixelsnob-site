
const gulp = require('gulp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');

const src = 'tmp/images/flickr/*.{jpg,JPG}';

// const largeImages = (cb) => {
//   gulp
//     .src(src)
//     .pipe(imagemin([
//       imageminMozjpeg({ quality: 90 })
      
//     ]))
//     //.pipe(imageResize({ width: 1000 }))
//     .pipe(gulp.dest('dist/images/flickr/large'));
//   cb();
// };

const thumbnailImages = (cb) => {
  gulp
    .src(src)
    .pipe(imagemin([
      imageminMozjpeg({ quality: 50, progressive: true })  
    ]))
    .pipe(imageResize({ width: 250 }))
    .pipe(gulp.dest('dist/images/flickr/thumbnails'));
  cb();
};

gulp.task('thumbnails', thumbnailImages);
//gulp.task('large', largeImages);

gulp.task('default', gulp.parallel('thumbnails'));

