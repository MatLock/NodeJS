"use strict";

var controllers = angular.module('controllers');

controllers.controller("searchController", ["$scope",
    "searchService",
    "$rootScope",
    "Notification",
    function ($scope,
              searchService,
              $rootScope,
              Notification) {

        var _this = this;

        $scope.key = "q";

        $scope.results = null;


        $scope.deleteUsuario = function (id){
            searchService.deleteUsuario(id, function(){
                $scope.results = $scope.results.filter( (alumn) => alumn._id != id );
            });
        }

        this.search = function () {

            searchService.search()
                .then(function (results) {
                    $scope.results = results.data;
                })
                .catch(function (err) {
                    Notification.error(err);
                });
        };


    }]);