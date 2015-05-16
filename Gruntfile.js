module.exports = function (grunt) {
  grunt.initConfig({
    bower: {
      install: {
        targetDir: "./lib",
        layout: "byType",
        install: true,
        verbose: false,
        cleanTargetDir: true,
        cleanBowerDir: false
      }
    },
    typescript: {
      base: {
        src: [
          "./script.ts"
        ],
        dest: "./script.js",
        options: {
          comments: true
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-typescript");

  grunt.registerTask("compile", [
    "bower:install",
    "typescript:base"
  ]);
};
