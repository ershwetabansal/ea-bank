(function() {
  'use strict';
  angular.module('BankApp').service('mockLoader',loader);
  
  function loader(User,Account,Transaction) {

      var vm = this;
      var customer;
      var account;

      var users = [{fName : "Hermoine", lName : "Granger", postCd : "E859AB"}, 
                  {fName : "Harry", lName : "Potter", postCd : "E725JB"}, 
                  {fName : "Ron", lName : "Weasly", postCd : "E55555"},
                  {fName : "Albus", lName : "Dumbledore", postCd : "E55656"},
                  {fName : "Neville", lName : "Longbottom", postCd : "E89898"}
                  ];


    	vm.loadData = function(){
        var userObj =  (localStorage.getItem("User"));
        var acctObj = (localStorage.getItem("Account"));
        var txObj = (localStorage.getItem("Transaction"));

        console.log("User Object :"+userObj);
        if (userObj && acctObj) {
          User.loadObject(JSON.parse(userObj));
          Account.loadObject(JSON.parse(acctObj));
          if (txObj) {
            Transaction.loadObject(JSON.parse(txObj));
          }
        } else {
          for(var i=0, len = users.length; i <len; i++) {
            var userId = User.addUser(users[i]);
            Account.createAccount(userId,"Dollar");
            Account.createAccount(userId,"Pound");
            Account.createAccount(userId,"Rupee");
          }   
          User.saveObj();
          Account.saveObj();     
        }
    	};

  }
  loader.$indject = ['User','Account'];

})();