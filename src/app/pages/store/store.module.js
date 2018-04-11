(function () {
    'use strict';

    angular.module('BlurAdmin.pages.store', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('store', {
                url: '/comercio',
                template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Comercio',
                sidebarMeta: {
                    icon: 'ion-home',
                    order: 800,
                },
            })
            .state('store.add', {
                url: '/nuevo',
                templateUrl: 'app/pages/store/add/addStore.html',
                title: 'Nuevo Comercio',
                controller: 'AddStoreCtrl',
                sidebarMeta: {
                    order: 0,
                },
            });
    }
})();
