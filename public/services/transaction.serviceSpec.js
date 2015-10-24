describe('Bank User Account Transaction Service Testing.', function() {
  'use strict';

  // Service instance
  var txService;
  var accountService;
  var userService;
  beforeEach(function() {
    module('BankApp');
  });
  beforeEach(
      inject(function(Transaction,Account,User){
        txService = Transaction;
        accountService = Account;
        userService = User;
      }));


  describe('should be able to perform transactions.', function() {
    
    var userId;
    var accountNumber;
    var currency = "dollar";
    

    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      userId = userService.addUser(user);
      accountNumber = accountService.createAccount(userId,currency);
    });

    it('should verify deposited and withdrawl amount.', function() {
      var depositObj = txService.deposit(userId,accountNumber,100);
      expect(depositObj).toBeDefined();
      expect(depositObj.date).toBeDefined();
      expect(depositObj.amount).toBe(100);
      expect(depositObj.deposit).toBeTruthy();

      expect(accountService.getAccount(accountNumber).amount).toBe(100);

      var withdrawlObj = txService.withdrawl(userId,accountNumber,100);
      expect(withdrawlObj).toBeDefined();
      expect(withdrawlObj.date).toBeDefined();
      expect(withdrawlObj.amount).toBe(100);
      expect(withdrawlObj.withdrawl).toBeTruthy();

      expect(accountService.getAccount(accountNumber).amount).toBe(0);
    });


    it('should verify multiple transactions.', function() {
      txService.deposit(userId,accountNumber,100);
      txService.withdrawl(userId,accountNumber,100);
      var transactions = txService.getTransactions(userId,accountNumber);

      expect(transactions).toBeDefined();
      expect(transactions.length).toBe(2);
    });

  });


});