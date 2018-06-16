(function () {
    'use strict';
    
    angular.module('BlurAdmin.pages.store')
            .controller('StoresCtrl', StoresCtrl);
    
    function StoresCtrl($scope, StoresService, $uibModal, toastr, toastrConfig) {
        var toastrOptions = {
            autoDismiss: false,
            positionClass: 'toast-top-right',
            timeOut: '3000',
            extendedTimeOut: '3000',
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            allowHtml: true
        };
        
        $scope.stores = [];
        $scope.init = function () {
            $scope.loading = true;

            StoresService.getStores().then(function (data) {
                $scope.stores = data.data;
                $scope.loading = false;
            }).catch(function (err) {
                $scope.loading = false;
                toastr["error"](err.data ? err.data.message : 'Hubo un error al intentar cargar los comercios. Intente nuevamente', "Error al cargar comercios");
            });
        }

        $scope.disableStore = function (index) {
            var store = $scope.stores[index];
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/store/list/stores.disable.modal.html',
                controller: 'StoresModalCtrl',
                controllerAs: 'ctrl'
            });

            modalInstance.result.then(function (data) {
                store.reason = data;
                store.updating = true;
                StoresService.enableDisableStore(store, true).then(function () {
                    store.disabled = true;
                    store.updating = false;
                    toastr.success("El comercio fue deshabilitado");
                })
                .catch(function (err) {
                    toastr["error"](err.data ? err.data.message : 'Hubo un error al intentar deshabilitar el comercio. Intente nuevamente', "Error al deshabilitar comercio")
                    store.updating = false;
                })
            })
        }

        $scope.enableStore = function (index) {
            var store = $scope.stores[index];
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/store/list/stores.enable.modal.html',
            });

            modalInstance.result.then(function () {
                store.updating = true;
                StoresService.enableDisableStore(store, false).then(function () {
                    store.disabled = false;
                    store.updating = false;
                    toastr.success("El comercio fue habilitado");
                })
                .catch(function (err) {
                    toastr["error"](err.data ? err.data.message : 'Hubo un error al intentar habilitar el comercio. Intente nuevamente', "Error al habilitar comercio");
                    store.updating = false;
                })
            })
        }
    }
})();