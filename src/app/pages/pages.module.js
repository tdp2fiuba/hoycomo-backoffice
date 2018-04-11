/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    
    'BlurAdmin.pages.store',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/comercio/nuevo');
    /*
    baSidebarServiceProvider.addStaticItem({
        title: 'Comercios',
        icon: 'ion-home',
        subMenu: [{
            title: 'Nuevo Comercio',
            fixedHref: '/app/pages/store/add/addStore.html',
        }]
    });
    */
  }

})();
