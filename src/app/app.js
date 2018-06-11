'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])

.factory('Server', function () {
    var SERVER_URI = "https://hoycomo-server.herokuapp.com";
    //var SERVER_URI = "http://localhost:8080";

    function pushStore(data,callback) {
        var response = {};

        if (!data.name || !data.address || !data.business_name || !data.email){
            response.success = false;
            response.error = "Debe definir todos los campos";
            return response;
        }
        $.post(SERVER_URI + "/api/store",data)
        .done(function (dataResponse) {
            response.success = true;
            response.data = dataResponse;
            callback(response);
        })
        .fail(function ( jqXHR, textStatus) {
            response.success = false;
            response.error = jqXHR.responseJSON.error || "intente nuevamente más tarde";
            callback(response);
        })

    }

    function getAddressData(addressName,callback) {
        var response = {};

        if (!addressName ){
            response.success = false;
            response.error = "Debe ingresar una dirección";
            return response;
        }
        $.get(SERVER_URI + "/utils/geocoding",{address_name:addressName})
            .done(function (dataResponse) {
                response.success = true;
                response.address = dataResponse;
                callback(response);
            })
            .fail(function ( jqXHR, textStatus) {
                response.success = false;
                response.error = jqXHR.responseJSON.error || "intente nuevamente más tarde";
                callback(response);
            });
    }

    function getBilling(start,end,callback) {
        var response = {};

        if (!start || !end){
            response.success = false;
            response.error = "Debe ingresar una fecha de inicio";
            return response;
        }
        if (!end){
            response.success = false;
            response.error = "Debe ingresar una fecha de fín";
            return response;
        }
        $.get(SERVER_URI + "/api/stats/billing",{start_date:start,end_date:end})
            .done(function (dataResponse) {
                response.success = true;
                response.billings = dataResponse;
                callback(response);
            })
            .fail(function ( jqXHR, textStatus) {
                response.success = false;
                response.error = jqXHR.responseJSON.message || "intente nuevamente más tarde";
                callback(response);
            });
    }

    function getFee(start,end,callback) {
        var response = {};

        if (!start || !end){
            response.success = false;
            response.error = "Debe ingresar una fecha de inicio";
            return response;
        }
        if (!end){
            response.success = false;
            response.error = "Debe ingresar una fecha de fín";
            return response;
        }
        $.get(SERVER_URI + "/api/stats/fee",{start_date:start,end_date:end})
            .done(function (dataResponse) {
                response.success = true;
                response.fee = dataResponse;
                callback(response);
            })
            .fail(function ( jqXHR, textStatus) {
                response.success = false;
                response.error = jqXHR.responseJSON.message || "intente nuevamente más tarde";
                callback(response);
            });
    }

    return {
        pushStore       : pushStore,
        getAddressData  : getAddressData,
        getBilling      : getBilling,
        getFee          : getFee
    }
});
