(function () {
    'use strict';

    angular.module('BlurAdmin.pages.foodTypes').controller('FoodTypesModalCtrl', FoodTypesModalCtrl);

    function FoodTypesModalCtrl($scope) {
        this.ok = function () {
            $scope.$close();
        };

        this.cancel = function () {
            $scope.$dismiss();
        };
    }
})();