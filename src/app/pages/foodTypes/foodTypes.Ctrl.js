(function () {
    'use strict';
    
    angular.module('BlurAdmin.pages.foodTypes')
      .controller('FoodTypesCtrl', FoodTypesCtrl);

  /** @ngInject */
    function FoodTypesCtrl($scope, toastr, toastrConfig, $uibModal, FoodTypesService) {
        var toastrOptions = {
            autoDismiss: false,
            positionClass: 'toast-top-right',
            timeOut: '2000',
            extendedTimeOut: '2000',
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            allowHtml: true
        };

        $scope.loading = false;
        $scope.foodTypes = [];
        $scope.init = function () {
            $scope.loading = true;
            FoodTypesService.getFoodTypes().then(function(data) {
                $scope.loading = false;
                $scope.foodTypes = data.data;
            })
            .catch(function (err) {
                $scope.loading = false;
            });
        }

        $scope.removeFoodType = function(index) {
            var foodType = $scope.foodTypes[index];
            const modalInstance = $uibModal.open({
                templateUrl: '/app/pages/foodTypes/foodTypes.modal.html',
                controller: 'FoodTypesModalCtrl',
                controllerAs: 'ctrl'
            });

            modalInstance.result.then(function () {
                foodType.deleting = true;
                FoodTypesService.deleteFoodType(foodType).then(function () {
                    foodType.deleting = false;
                    $scope.foodTypes.splice(index, 1);
                    toastr.success("El tipo de comida fue borrado");
                }).catch(function (err) {
                    foodType.deleting = false;
                    angular.extend(toastrConfig, toastrOptions);
                    var message = err.data ? err.data.message : "Hubo un error conectándose con el servidor. Intente nuevamente";
                    toastr["error"](message, "Error al borrar tipo de comida");
                });
            });
        };
    
        $scope.addFoodType = function() {
            $scope.inserted = {
                id: $scope.foodTypes.length+1,
                description: ''
            };
            $scope.foodTypes.push($scope.inserted);
        };

        $scope.checkName = function(name, index) {
            if (name === "") {
                return "Debe ingresar un nombre";
            }
            if ($scope.foodTypes.find(function (type, typeIndex) { return type.description.toLowerCase() === name.toLowerCase() && typeIndex !== index })) {
                return "Ya existe un tipo con ese nombre";
            } 
        }

        $scope.submitFoodType = function(foodType, rowform, index) {
            foodType.saving = true;
            return new Promise(function (resolve, reject) {
                FoodTypesService.addFoodType(foodType)
                .then(function () {
                    foodType.saving = false;
                    toastr.success("El tipo de comida fue añadido");
                    resolve();
                })
                .catch(function (err) {
                    foodType.saving = false;
                    angular.extend(toastrConfig, toastrOptions);
                    var message = err.data ? err.data.message : "Hubo un error conectándose con el servidor. Intente nuevamente";
                    toastr["error"](message, "Error al insertar tipo de comida");
                    reject();
                });
            });
            
        }

        $scope.cancelNew = function (index) {
            $scope.foodTypes.splice(index, 1);
        }
  }
})();