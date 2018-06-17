(function () {
    'use strict';

    angular.module('BlurAdmin.pages.store').provider('StoresService', function () {
        // var STORE_PATCH_URL = "http://localhost:8080/api/store/";
        // var STORES_GET_URL = "http://localhost:8080/api/stores/";
        var STORE_PATCH_URL = "https://hoycomo-server.herokuapp.com/api/store/";
        var STORES_GET_URL = "https://hoycomo-server.herokuapp.com/api/stores/";
        
        this.$get = function ($http) {
            var getStores = function () {
                return $http({
                    method: 'GET',
                    url: STORES_GET_URL + "?all=true",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            };

            var enableDisableStore = function (store, disable) {
                return $http({
                    method: 'PATCH',
                    url: STORE_PATCH_URL +  store.id + "/disable",
                    data: { disable: disable, reason: store.reason },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            };

            return {
                getStores: getStores,
                enableDisableStore: enableDisableStore
            };
        }
    });
})();