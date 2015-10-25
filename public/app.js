/** Setting the angular module **/

angular.module('BankApp',['ui.router']).controller('bodyCtrl',bodyCtrl);

function bodyCtrl ($scope,$state,mockLoader) {	
	mockLoader.loadData();
	$state.transitionTo('main.options');
}
bodyCtrl.$inject = ['$scope','$state','mockLoader'];
