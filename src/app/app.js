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
    const SERVER_URI = "https://hoycomo-server.herokuapp.com";
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

    return {
        pushStore : pushStore,
        getAddressData: getAddressData
    }
});
