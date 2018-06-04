(function () {
    'use strict';

    angular.module('BlurAdmin.pages.foodTypes', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('foodTypes', {
                url: '/foodTypes',
                templateUrl : 'app/pages/foodTypes/foodTypes.html',
                title: 'Tipos de Comida',
                controller: 'FoodTypesCtrl',
                sidebarMeta: {
                    icon: 'ion-clipboard',
                    order: 900,
                },
            })
    }
})();
