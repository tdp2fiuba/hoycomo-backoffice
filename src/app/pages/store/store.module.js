(function () {
    'use strict';

    angular.module('BlurAdmin.pages.store', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stores', {
                url: '/comercios',
                template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Comercios',
                sidebarMeta: {
                    icon: 'ion-home',
                    order: 800,
                },
            })
            .state('stores.list', {
                url: '',
                templateUrl: 'app/pages/store/list/stores.html',
                title: 'Listado ',
                controller: 'StoresCtrl',
                sidebarMeta: {
                    icon: 'ion-home',
                    order: 0
                }
            })
            .state('stores.add', {
                url: '/nuevo',
                templateUrl: 'app/pages/store/add/addStore.html',
                title: 'Nuevo Comercio',
                controller: 'AddStoreCtrl',
                sidebarMeta: {
                    order: 1,
                },
            });
    }
})();
