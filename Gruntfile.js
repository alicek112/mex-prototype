module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.registerTask("default", ["jshint", "mochaTest"]);

    grunt.initConfig({
	    jshint: {
		files:["*.js"]
		    },
	    mochaTest: {
		test: {
		    options: {
			reporter: "spec"
		    },
		    src: ["test/**/*.js"]
		}
	    }
});
    
};