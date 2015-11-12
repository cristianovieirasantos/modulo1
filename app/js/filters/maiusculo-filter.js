angular.module('modulo1').filter('maiusculo', maiusculo);

function maiusculo() {
    return function (input) {
        //if (input !== undefined && input!=null) {

        if (input && typeof input==="string") {
            return input.toUpperCase();
        }
    }
}
