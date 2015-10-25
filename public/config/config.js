/** Setting the angular module **/

angular.module('BankApp').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('main', {
            url: '',
            templateUrl: 'views/main.html',
            abstract:true,
            controller: 'mainCtrl'
        })

        .state('main.options', {
            url: '/login',
            templateUrl: 'views/options.html',
            controller: 'optionCtrl'
        })

		.state('main.mgrView', {
            url: '/manager',
            templateUrl: 'views/managerView.html',
            controller: 'managerViewCtrl'
        })

   		.state('main.mgrView.add', {
            url: '/addCust',
            templateUrl: 'views/newCustomer.html',
            controller: 'addCustomerCtrl'
        })

        .state('main.mgrView.account', {
            url: '/openAccount',
            templateUrl: 'views/openAccount.html',
            controller: 'openAccountCtrl'
        })

   		.state('main.mgrView.list', {
            url: '/list',
            templateUrl: 'views/customerList.html',
            controller: 'listCustomerCtrl'
        })

		.state('main.custView', {
            url: '/customer',
            templateUrl: 'views/customerView.html',
            controller: 'customerViewCtrl'
        })

   		.state('main.account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: 'accountCtrl'
        })

   		.state('main.account.deposit', {
            url: '',
            templateUrl: 'views/depositTx.html',
            controller: 'depositCtrl'
        })

   		.state('main.account.withdrawl', {
            url: '',
            templateUrl: 'views/withdrawlTx.html',
            controller: 'withdrawlCtrl'
        })

        .state('main.list', {
            url: '/listTx',
            templateUrl: 'views/listTx.html',
            controller: 'listTransactionCtrl'
        })
        ;


});
