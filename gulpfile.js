//const {watch, series} = require("gulp");
const gulp = require("gulp");
const sourcemap = require("gulp-sourcemaps");
const terser = require("gulp-terser");
var ts = require("gulp-typescript");

 function tsc() {
  
  var tsProject = ts.createProject("tsconfig.json");
  return gulp.src('src/sh2file.ts').pipe(tsProject()).js.pipe(gulp.dest("dist"));
};

function tscompile(){
  var tsProject = ts.createProject("tsconfig.json");
  return gulp.src("src/*.ts").pipe(tsProject()).js.pipe(gulp.dest("test"));
}


function build(){
  var tsProject = ts.createProject("tsconfig.json");
  return  gulp.src("src/*.ts")
  .pipe(tsProject()).js
  .pipe(sourcemap.init())
  .pipe(terser())
  .pipe(sourcemap.write("./"))
  .pipe(gulp.dest("dist"))


}




exports.watch =  function(){
  gulp.watch("src/*ts",tscompile);

}
exports.build = gulp.series(build);

exports.default = tscompile;

  














