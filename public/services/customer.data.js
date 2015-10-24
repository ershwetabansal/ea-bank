(function() {
  'use strict';
  angular.module('BankApp').service('CustomerData',customerData);
  
  function customerData() {

      var vm = this;
      var customer;
      var account;

    	vm.setUser = function(user){
        customer = user;
    	};

      vm.getUser = function() {
        return customer;
      }

      vm.setAccount = function(acct){
        account = acct;
      };

      vm.getAccount = function() {
        return account;
      }

  }

})();