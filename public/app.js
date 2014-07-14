(function(angular){
	var module = angular.module("news-tos", ["ngRoute"]);
	
	module.config(['$routeProvider', '$locationProvider',
	   function($routeProvider, $locationProvider) {
		  console.log("starting config");
	      $routeProvider
	        .when('/show/:id', {
	          templateUrl: '/partials/show',
	          controller: 'ShowByIdCtrl'
	        })
	        .when('/add', {
	          templateUrl: '/partials/add',
	          controller: 'AddCtrl'
	        })
	        .when('/noempty', {
	          templateUrl: '/partials/noempty',
	          controller: 'NoEmptyCtrl'
	        })
	        .when('/', {
	          templateUrl: '/partials/list',
	          controller: 'ListCtrl'
	        });

	      // configure html5 to get links working on jsfiddle
	      $locationProvider.html5Mode(true);
	  }]);
	
	module.controller("ListCtrl", ["$scope", "$http", function($scope, $http){
		$scope.status = "Loading...";
		$http.get("/api/news-tos").
			success(function(data) {
				$scope.records = data;
				$scope.status = "";
			}).
			error(function(err) {
				$scope.status = "ERROR: " + err;
			});
		
	}]);
	
	module.controller("ShowByIdCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
		$scope.status = "Loading...";
		$http.get("/api/news-tos/" + $routeParams.id).
			success(function(data) {
				$scope.record = data;
				$scope.status = "";
			}).
			error(function(err) {
				$scope.status = "ERROR: " + err;
			});
		
	}]);
	
	module.controller("AddCtrl", ["$scope", "$http", function($scope, $http){
		$scope.status = "Loading...";
		$http.get("/api/add").
			success(function(data) {
				$scope.record = data;
				$scope.status = "";
			}).
			error(function(err) {
				$scope.status = "ERROR: " + err;
			});
		
	}]);
	
	module.controller("NoEmptyCtrl", ["$scope", "$http", function($scope, $http){
		
		
	}]);
	
})(angular);