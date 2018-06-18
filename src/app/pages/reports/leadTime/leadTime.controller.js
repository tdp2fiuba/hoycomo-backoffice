(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('leadTimeReportController', leadTimeReportController);

    /** @ngInject */
    function leadTimeReportController($scope, toastr, toastrConfig, baConfig, OrderReportsService) {
        $scope.loading = true;
        $scope.emptyMessage = "No hay clientes disponibles";

        $scope.leadTimePerClient = [
            { client: 'Pertutti', leadTime: 30.54},
            { client: 'La Farola', leadTime: 120.66},
            { client: 'El Banco Rojo', leadTime: 25.33},
            { client: 'McDonald\'s', leadTime: 20}
        ];

        const end = new Date;
        const start = new Date(end.getFullYear(),end.getMonth() - 1, end.getDate());
        $scope.date = {
            start: start,
            end: end
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

        function getLeadTimes() {
            $scope.loading = true;
            const start = $scope.date.start.toString();
            const end = $scope.date.end.toString();
            OrderReportsService.getLeadTimePerClient(start,end)
            .then(res => {
                if (!res.success){
                    toastr.error(res.error, 'Error al cargar los pedidos');
                    $scope.loading = false;
                    return;
                }
                $scope.leadTimePerClient = res.leadTimes.map(function (leadTime) {
                    return {
                        client: leadTime.client,
                        leadTime: Math.ceil(leadTime.leadTime / 60)
                    }
                });

                $scope.loading = false;
            });
        }

        $scope.getLeadTimes = getLeadTimes;

        $scope.loading = false;
        getLeadTimes();
    }

})();