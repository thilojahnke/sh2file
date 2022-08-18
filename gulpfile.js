//const {watch, series,parallel} = require("gulp");
const gulp = require("gulp");
const sourcemap = require("gulp-sourcemaps");
const terser = require("gulp-terser");
var ts = require("gulp-typescript");
var makeDir = require("make-dir");


 function tsc() {
  
  var tsProject = ts.createProject("tsconfig.json");
  return gulp.src('src/sh2file.ts').pipe(tsProject()).js.pipe(gulp.dest("dist"));
};

function tscompile(){
  var tsProject = ts.createProject("tsconfig.json");
  return gulp.src("src/*.ts").pipe(tsProject()).js.pipe(gulp.dest("test"));
}

async function createDir(){
 await makeDir("dist/resources/mazes/");
}

async function delDist(){
 const del = await import("del");
 del.deleteSync(["dist"]);

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
exports.build = gulp.series(delDist,build,createDir);

exports.clean = gulp.series(delDist);

exports.default = tscompile;