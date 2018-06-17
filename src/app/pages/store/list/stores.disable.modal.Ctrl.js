(function () {
    'use strict';

    angular.module('BlurAdmin.pages.store')
        .controller('StoresModalCtrl', StoresModalCtrl);

    function StoresModalCtrl($scope) {
        var ctrl = this;
        this.ok = function () {
            if (!ctrl.reason) {
                ctrl.reasonClass = "error-textarea";
                ctrl.error = true;
            } else {
                $scope.$close(ctrl.reason);
            }
        };

        this.cancel = function () {
            $scope.$dismiss();
        };

        $scope.$watch('ctrl.reason', function (newValue) {
            if (newValue) {
                ctrl.reasonClass = "";
                ctrl.error = false;
            }
        })
    }
})();