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
    tsd: {
      refresh: {
        options: {
          command: "reinstall",
          latest: true,
          config: "./tsd.json",
          opts: {
          }
        }
        
      }
    },
    typescript: {
      base: {
        src: [
          "./script.ts"
        ],
        dest: "./script.js",
        options: {
          comments: true,
          sourceMap: true
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-tsd");
  grunt.loadNpmTasks("grunt-typescript");

  grunt.registerTask("compile", [
    "bower:install",
    "tsd:refresh",
    "typescript:base"
  ]);
};
