angular.module('modulo1').service('AlertService', AlertService);

AlertService.$inject = ['$growl'];

function AlertService($growl) {
    this.showMessage = showMessage;
    this.SALVOMSG = 'Registro salvo com sucesso';

    function showMessage(titulo, mensagem, tempo) {

        tempo = (!tempo)?3000:tempo;

        if (!tempo){
            tempo = 3000;
        }

        $growl.box(titulo, mensagem, {
            class: 'success',
            timeout: tempo
        }).open();
    }
}