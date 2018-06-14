(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('billingController', billingController);

    /** @ngInject */
    function billingController($scope, $window, toastr, toastrConfig, Server, $filter, $uibModal) {
        $scope.loading = true;
        $scope.emptyMessage = "No hay facturaciones disponibles";
        $scope.billings = [];

        $scope.date = {
            start: new Date(2018, 2, 1, 0, 0),
            end: new Date()
        };

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


        function getBillings() {
            $scope.loading = true;
            var start = $scope.date.start.toString();
            var end = $scope.date.end.toString();
            Server.getBilling(start,end,function (res) {
                if (!res.success){
                    toastr.error(res.error, 'Error al cargar las facturaciones');
                    $scope.loading = false;
                    return;
                }

                $scope.billings = res.billings;

                $scope.loading = false;
            });
        }

        $scope.getBillings = getBillings;

        getBillings();
    }

})();