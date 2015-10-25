(function() {
  'use strict';
  angular.module('BankApp').service('CustomerData',customerData);
  
  function customerData($timeout) {

      var vm = this;
      var customer;
      var account;

    	vm.setUser = function(user){
        customer = user;
        $timeout(function() {
          localStorage.setItem('CurrentUser',JSON.stringify(customer));
        }, 0);
    	};

      vm.getUser = function() {
        if (typeof(customer) !== "undefined") return customer;
        else {
          var obj =localStorage.getItem('CurrentUser');
          if (obj) return JSON.parse(obj);
        }
      }

      vm.setAccount = function(acct){
        account = acct;
        $timeout(function() {
          localStorage.setItem('CurrentAccount',JSON.stringify(account));
        }, 0);
      };

      vm.getAccount = function() {
        if(typeof(account) !== "undefined") return account;
        else {
          var obj =localStorage.getItem('CurrentAccount');
          if (obj) return JSON.parse(obj);
        }
      }

  }
  customerData.$inject = ['$timeout'];

})();