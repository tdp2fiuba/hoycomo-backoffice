(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('feeController', feeController);

    /** @ngInject */
    function feeController($scope, $window, toastr, toastrConfig, Server, $filter, $uibModal) {
        $scope.loading = true;
        $scope.emptyMessage = "No hay comisiones disponible";
        $scope.fee = [];

        $scope.date = {
            start: new Date(2018, 2, 1, 0, 0),
            end: new Date()
        };

        /*
        $scope.datepickerStartOption = {
            showWeeks: false,
            datepickerMode: 'month',
            maxDate: $scope.date.end
        };

        $scope.datepickerEndOption = {
            showWeeks: false,
            datepickerMode: 'month',
            //minMode: 'month'
            minDate: $scope.date.start
        };
        */

        $scope.toastOptions = {
            autoDismiss: false,
            positionClass: 'toast-top-right',
            type: 'error',
            timeOut: '3000',
            extendedTimeOut: '3000',
            closeButton: true,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            allowHtml: true
        };


        function getFee() {
            $scope.loading = true;
            var start = $scope.date.start.toString();
            var end = $scope.date.end.toString();
            Server.getFee(start,end,function (res) {
                if (!res.success){
                    toastr.error(res.error, 'Error al cargar las comisiones');
                    $scope.loading = false;
                    return;
                }

                $scope.fee = res.fee;

                $scope.loading = false;
            });
        }

        $scope.getFee = getFee;

        getFee();
    }

})();