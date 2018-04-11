(function () {
    'use strict';

    angular.module('BlurAdmin.pages.store')
        .controller('AddStoreCtrl', AddStoreCtrl);

    /** @ngInject */
    function AddStoreCtrl($scope, $timeout, toastr, toastrConfig, $uibModal,baProgressModal,Server) {

        angular.extend(toastrConfig, {
            autoDismiss: false,
            positionClass: 'toast-top-right',
            type: 'info',
            timeOut: '5000',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false
        });

        $scope.openModal = function (modalHtml, size) {
            $uibModal.open({
                animation: true,
                template: modalHtml,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        $scope.openToast = function (title,msg,type) {
            var _type = type || 'info';
            toastr[_type](msg, title);
        };

        $scope.validateAddress = function () {
            var address = $('#addStoreAddress');

            if (address.val() === ""){
                $scope.openToast("Error","Debe ingresar una dirección para validarla",'error');
                return;
            }

            Server.getAddressData(address.val(),function (response) {
                if (!response.success){
                    $scope.openToast("Error",response.error,'error');
                    return;
                }
                address.val(response.address.name);

                renderGoogleMaps({zoom:16, lat: response.address.lat, lon: response.address.lon},{lat: response.address.lat, lon: response.address.lon});
            });
        };

        $scope.addStore = function() {
            var valid = true;

            //name, address and business name not empty
            var name = $('#addStoreName');
            var address = $('#addStoreAddress');
            var businessName = $('#addStoreBusinessName');

            var inputsToValidate = [name,address,businessName];

            inputsToValidate.forEach(function (input) {
                if (input.val() === ""){
                    valid = false;
                    input.parent().addClass('has-error');
                }
            });

            if (!valid) {
                $scope.openToast('Error','Complete todos los campos','error');

                return false;
            }

            //addStoreProgressModal($timeout,$scope.baProgressModal);
            Server.pushStore({name:name.val(), address:address.val(), business_name:businessName.val()},function (res) {
                if (!res.success){
                    $scope.openToast('Error al agregar nuevo comercio',res.error,'error');
                    console.log(res.error);
                    return;
                }

                $scope.openModal('<div class="modal-content"><div class="modal-header bg-success"><i class="ion-checkmark modal-icon"></i><span> Success</span></div><div class="modal-body" style="font-size: 1.2em;line-height: 1.2em;">El comercio, <b>'+ name.val() +'</b>,  fue dado de alta con éxito.<br/> Los datos para el acceso son: <br/><br/> <b>Usuario:</b> '+ res.data.user +' <br/> <b>Contraseña:</b> '+ res.data.password +'</n> </div><div class="modal-footer"><button type="button" class="btn btn-success" ng-click="$dismiss()">OK</button></div></div>', 'md');

                //clean inputs
                name.val("");
                address.val("");
                businessName.val("");
                $('.has-error').removeClass('has-error');
            });

        };

        function renderGoogleMaps(center,marker) {
            if (!center) {
                center = {zoom:10, lat: -34.6157437, lon: -58.5733856}
            }

            var mapCanvas = document.getElementById('mapValidationAddress');
            var mapOptions = {
                center: new google.maps.LatLng(center.lat, center.lon),
                zoom: center.zoom || 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);

            if (marker && marker.lat && marker.lon){
                var marker = new google.maps.Marker({
                    position: {lat: marker.lat, lng: marker.lon},
                    map: map
                });
            }

        }

        $timeout(function(){
            renderGoogleMaps();
        }, 100);
    }

})();
