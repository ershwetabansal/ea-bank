(function() {
  'use strict';
  angular.module('BankApp').service('Transaction',txService);
  
  function txService(Account) {

      var txArray = {};
      var vm = this;

      vm.deposit = function(userid, accountNo,amout){
        return transaction(userid,accountNo,amout,0);
      };
      vm.withdrawl = function(userid, accountNo,amout){
        return transaction(userid,accountNo,0,amout);
      };

      vm.getTransactions = function (userid,accountNo){
        return (txArray[userid])[accountNo];
      }
      function transaction(user,account,depAmt,wdAmt) {
        txArray[user] = txArray[user] || {};
        (txArray[user])[account] = (txArray[user])[account] || [];
        var txObj = {};
        txObj.date = new Date();
        if(depAmt && depAmt > 0) {
          txObj.amount = depAmt;
          txObj.deposit = true;
          var success = Account.updateAmount(account,depAmt);
          txObj.success = success;
        }

        if(wdAmt && wdAmt > 0) {
          txObj.amount = wdAmt;
          txObj.withdrawl = true;
          var success = Account.updateAmount(account,(wdAmt * -1));
          txObj.success = success;
        }
        (txArray[user])[account].push(txObj);
        return txObj;
      }
  }

txService.$inject = ['Account'];

})();