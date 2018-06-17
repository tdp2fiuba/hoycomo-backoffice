(function() {
    'use strict';

    angular.module('BlurAdmin.pages.reports').provider('OrderReportsService', function () {

        this.$get = function ($http) {
            const getLeadTimePerClient = function (start, end) {

                if (!start || !end){
                    return Promise.resolve({ success: false, error: "Debe ingresar ambas fechas" });
                }

                const url = 'http://localhost:8080/api/stats/lead_time_per_client';
                return $http({
                    method: 'GET',
                    url: url,
                    params: { start_date: start, end_date: end},
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    return Promise.resolve({ success: true, leadTimes: response.data });
                });
            };

            return {
                getLeadTimePerClient: getLeadTimePerClient
            };
        };
    });

})();