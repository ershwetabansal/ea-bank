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
        if (txArray[userid]) return (txArray[userid])[accountNo];
      }
      vm.loadObject = function(obj){
        txArray = obj;
      }
      vm.saveObj = function() {
        localStorage.setItem('Transaction',JSON.stringify(txArray));
      }
      vm.deleteUser = function(userId) {
        delete txArray[userId];
      }
      vm.deleteTx = function(userId,accountNo){
        delete (txArray[userId])[accountNo];
        var success = Account.reset(accountNo);
      }
      function transaction(user,account,depAmt,wdAmt) {
        txArray[user] = txArray[user] || {};
        (txArray[user])[account] = (txArray[user])[account] || [];
        var txObj = {};
        txObj.date = new Date();
        txObj.dateTime = getDateTime(txObj.date);
        if(depAmt && depAmt > 0) {
          txObj.amount = depAmt;
          txObj.deposit = true;
          var success = Account.updateAmount(account,depAmt);
          txObj.success = success;
          txObj.type = "Credit";
        }

        if(wdAmt && wdAmt > 0) {
          txObj.amount = wdAmt;
          txObj.withdrawl = true;
          var success = Account.updateAmount(account,(wdAmt * -1));
          txObj.success = success;
          txObj.type = "Debit";
        }
        if (txObj.success) (txArray[user])[account].push(txObj);
        return txObj;
      }

      function getDateTime(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
      }
  }


txService.$inject = ['Account'];

})();