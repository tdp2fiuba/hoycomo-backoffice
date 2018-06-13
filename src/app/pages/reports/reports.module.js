(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reports', {
                url: '/reportes',
                template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Reportes',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 800,
                },
            })
            .state('reports.billing', {
                url: '/facturacion',
                templateUrl: 'app/pages/reports/billing/billing.html',
                title: 'Facturación',
                controller: 'billingController',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('reports.fee', {
                url: '/comisiones',
                templateUrl: 'app/pages/reports/fee/fee.html',
                title: 'Comisiones',
                controller: 'feeController',
                sidebarMeta: {
                    order: 0,
                },
            });
    }
})();
