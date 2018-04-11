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
    //const SERVER_URI = "http://localhost:8080";

    function pushStore(data,callback) {
        var response = {};

        if (!data.name || !data.address || !data.business_name){
            response.success = false;
            response.error = "Debe definir todos los campos";
            return response;
        }
        $.post(SERVER_URI + "/api/store",{store:{
            name: data.name,
            business_name: data.business_name,
            address: data.address
        }})
        .done(function (dataResponse) {
            response.success = true;
            response.data = dataResponse;
            callback(response);
        })
        .fail(function ( jqXHR, textStatus) {
            response.success = false;
            response.error = "intente nuevamente más tarde";
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
                response.error = "intente nuevamente más tarde";
                callback(response);
            });
    }

    return {
        pushStore : pushStore,
        getAddressData: getAddressData
    }
});
