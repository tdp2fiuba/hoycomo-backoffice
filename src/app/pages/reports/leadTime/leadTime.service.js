(function() {
    'use strict';

    angular.module('BlurAdmin.pages.reports').provider('OrderReportsService', function () {

        this.$get = function ($http) {
            var getLeadTimePerClient = function (start, end, cb) {
                if (!start || !end){
                    return cb({ success: false, error: "Debe ingresar ambas fechas" });
                }

                var response = {};
                var url = 'https://hoycomo-server.herokuapp.com/api/stats/lead_time_per_client';
                $.get(url,{ start_date: start, end_date: end})
                    .done(function (dataResponse) {
                        response.success = true;
                        response.fee = dataResponse;
                        cb(response);
                    })
                    .fail(function ( jqXHR, textStatus) {
                        response.success = false;
                        response.error = jqXHR.responseJSON.message || "intente nuevamente más tarde";
                        cb(response);
                    });
            };

            return {
                getLeadTimePerClient: getLeadTimePerClient
            };
        };
    });

})();