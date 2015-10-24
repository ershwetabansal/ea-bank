(function() {
  'use strict';
  angular.module('BankApp').service('Account',acctService);
  
  function acctService(User) {

      var acctArray = {};
      var vm = this;
      var availableAcctNo = 0;

      vm.createAccount = function(userId, currency){
        if(userId && currency) {
          availableAcctNo++;
          var account = {};
          account.accountNo = availableAcctNo;
          account.currency = currency;
          account.userId = userId;
          account.date = new Date();
          account.amount = 0;
          acctArray[availableAcctNo] = account;
          User.addAccount(userId,availableAcctNo);
          return availableAcctNo;
        }
        return 0;
      };

      vm.getAccount = function(accountNo) {
        return acctArray[accountNo];
      }
      vm.updateAmount = function (accountNo,amount){
        if (amount < 0 && (acctArray[accountNo].amount + amount) < 0) {
          console.error("Can not perform this transaction");
          return false;
        } else {
          acctArray[accountNo].amount = acctArray[accountNo].amount + amount; 
          return true;         
        }
      }

      vm.deleteAccount = function(accountNo) {
        delete acctArray[accountNo];
      } 
  }

acctService.$inject = ['User'];

})();