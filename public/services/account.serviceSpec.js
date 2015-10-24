describe('Bank User Account Service Testing.', function() {
  'use strict';

  // Service instance
  var accountService;
  var userService;
  beforeEach(function() {
    module('BankApp');
  });
  beforeEach(
      inject(function(Account,User){
        accountService = Account;
        userService = User;
      }));


  describe('should be able to add an account.', function() {
    
    var userId;
    var accountNumber;
    var currency = "dollar";
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      userId = userService.addUser(user);
      accountNumber = accountService.createAccount(userId,currency);
    });

    it('should check the existence of account.', function() {
        var account = accountService.getAccount(accountNumber);
        expect(account).toBeDefined();
        expect(account.userId).toBe(userId);
        expect(account.currency).toBe(currency);
    });

    it('should check the existence of user.', function() {
        var user = userService.getUser(userId);
        expect(user).toBeDefined();
        expect(user.fName).toBe('Harry');
        expect(user.lName).toBe('Potter');
        expect(user.postCd).toBe('E725JB');
    });
  });

  describe('should verify the support of multiple accounts for a user.', function() {
    var userId;
    var accountNumber1;
    var accountNumber2;
    var currency1 = "dollar";
    var currency2 = "pound";
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      userId = userService.addUser(user);
      accountNumber1 = accountService.createAccount(userId,currency1);
      accountNumber2 = accountService.createAccount(userId,currency2);
    });
    
    it('should check number of accounts.', function() {
        var accounts = userService.getUserAccounts(userId);
        expect(accounts).toBeDefined();
        expect(accounts.length).toBe(2);
        for (var i=0,len = accounts.length; i <len;i++) {
          var account = accountService.getAccount(accounts[i])
          expect(account).toBeDefined();
          expect(account.currency).toBeDefined();
        }
    });

  });

});