(function () {
    'use strict';

    angular.module('BlurAdmin.pages.foodTypes').provider('FoodTypesService', function () {
        var SERVER_URL = "https://hoycomo-server.herokuapp.com/api/foodTypes/";
        this.$get = function ($http) {
            
            const getFoodTypes = function () {
                return $http({
                    method: 'GET',
                    url: SERVER_URL,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            };

            const addFoodType = function (foodType) {
                return $http({
                    method: 'POST',
                    url: SERVER_URL,
                    data: foodType,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            const deleteFoodType = function (foodType) {
                return $http({
                    method: 'DELETE',
                    url: SERVER_URL,
                    data: foodType,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            return {
                getFoodTypes: getFoodTypes,
                addFoodType: addFoodType,
                deleteFoodType: deleteFoodType
            };
        }
    });
})();