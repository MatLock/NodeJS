"use strict";
var services = angular.module("services");

services.service("searchService", ["$http", "api", function ($http, api) {

    this.search = function (params) {
        if (typeof params !== "undefined") {
            params.page = 1;
            params.limit = 30;
        }
        return $http.get("http://localhost:5000/service/users");
    }

    this.deleteUsuario = function(idUser,callback){
    	$http.delete("http://localhost:5000/service/users",{params:{id:idUser}}).success(callback());
    }

}]);
