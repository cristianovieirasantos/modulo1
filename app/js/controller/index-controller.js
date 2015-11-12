angular.module('modulo1', ['ngMessages', 'ui.growl']);
angular.module('modulo1').controller('IndexController', IndexController);

IndexController.$inject = ['$scope', 'AlertService'];

function IndexController($scope, AlertService) {
    $scope.entidade = {};
    $scope.arrEntidade = [];
    $scope.limpar = limpar;
    $scope.salvar = salvar;

    function salvar() {
        $scope.arrEntidade.push(angular.copy($scope.entidade));
        AlertService.showMessage('Salvo', AlertService.SALVOMSG, 1000);
        limpar();
    }

    function limpar() {
        $scope.entidade = {};
    }

}

