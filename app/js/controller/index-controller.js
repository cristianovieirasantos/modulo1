angular.module('modulo1', ['ngMessages', 'ui.growl','ui.grid', 'ui.router', 'os.lazyLoad']).config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider']

function config($stateProvider, $urlRouterProvider){

    var home = {
        url: '/',
        templateUrl: 'app/views/home.html'
    }

    var produto = {
        url: '/produto',
        templateUrl: 'app/views/produto/cadastro-produto.html'
    }

    var produtoPesquisa = {
        url: '/pesquisa',
        templateUrl: 'app/views/produto/pesquisa-produto.html'
    }

    var pessoa = {
        abstract: true,
        url: '/pessoa',
        template: '<ui-view>'
    }

    var cadastroPessoa= {
        url: '/cadastro',
        templateUrl: 'app/views/pessoa/cadastro-pessoa.html'
        resolve: {
            deps: function ($oclazyload) {
                return $oclazyload
                    .load({'js/controllers/CadastroPessoaController'
                })
            }
        }
    }

    var pesquisaPessoa = {
        url: '/pesquisa',
        templateUrl: 'app/views/pessoa/pesquisa-pessoa.html'
    }

    $stateProvider
        .state('home', home)
        .state('produto', produto)
        .state('produto.pesquisa', produtoPesquisa)
        .state('pessoa', pessoa)
        .state('pessoa.cadastro', cadastroPessoa)
        .state('pessoa.pesquisa', pesquisaPessoa)

}


angular.module('modulo1').controller('IndexController', IndexController);

IndexController.$inject = ['$scope', 'AlertService'];

function IndexController($scope, AlertService) {
    var selectedIndex      = undefined; /*CONTROLE DO ITEM SELECIONADO*/
    $scope.entidade        = {};
    $scope.arrEntidade     = [];
    $scope.limpar          = limpar;
    $scope.salvar          = salvar;
    $scope.getRowStyle     = getRowStyle;
    $scope.gridAlterarItem = gridAlterarItem;
    $scope.gridExcluirItem = gridExcluirItem;

    $scope.gridOptions = {
        columnDefs: [
            {name: 'Nome',          field: 'nome',        cellTemplate: 'app/templates/cell-template.html' },
            {name: 'Nascimento',    field: 'nascimento' },
            {name: 'Cor da Linha',  field: 'corLinha' },
            {name: '',              field: 'optAlterar', cellTemplate: 'app/templates/cell-template-button.html'}
        ],
        data: 'arrEntidade',
        enableRowSelection: true,
        rowTemplate: 'app/templates/row-template.html'
    };

    function salvar() {
        $scope.arrEntidade.push(angular.copy($scope.entidade));
        AlertService.showMessage('Salvo', AlertService.SALVOMSG, 1000);
        limpar();
    }

    function limpar() {
        $scope.entidade = {};
    }

    function getRowStyle(entidade){
        var resultStyle = {};
        if(entidade.corLinha){
            resultStyle.backgroundColor = entidade.corLinha;
        }
        return resultStyle;
    }


    function gridAlterarItem(entity, rowRenderIndex){
        selectedIndex = rowRenderIndex;
        $scope.entidade = angular.copy(entity);
    }

    function gridExcluirItem(rowRenderIndex){
        selectedIndex = undefined;
        $scope.arrEntidade.splice(rowRenderIndex,1);
    }


}

