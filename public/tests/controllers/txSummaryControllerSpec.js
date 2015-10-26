describe('Transaction Summary Controller Testing.', function() {
  'use strict';


  beforeEach(function() {
    module('BankApp');
  });

    var scope, createController,UserService,AccountService,TxService,CustomerDataService;


    beforeEach(inject(function ($rootScope, $controller,User,Account,Transaction,CustomerData) {
        scope = $rootScope.$new();
        AccountService = Account;
        UserService = User;
        TxService = Transaction;
        CustomerDataService = CustomerData;

        createController = function() {
            return $controller('listTransactionCtrl', {
                '$scope': scope
            });
        };
    }));

    var uniqueId;
    var user;
    var accountNo;
    beforeEach(function(){
      user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = UserService.addUser(user);
      accountNo = AccountService.createAccount(uniqueId,"dollar");
      CustomerDataService.setUser(user);
      CustomerDataService.setAccount(AccountService.getAccount(accountNo));
      TxService.deposit(uniqueId,accountNo,50);
      TxService.deposit(uniqueId,accountNo,150);
      TxService.deposit(uniqueId,accountNo,20);
      TxService.withdrawl(uniqueId,accountNo,50);
        
    });

    it('should get List of Transactions.', function() {
        var controller = createController();
        expect(scope.transactions).toBeDefined();
        expect(scope.transactions.length).toBe(4);
        expect(scope.transactions[0].amount).toBe(50);

        expect(AccountService.getAccount(accountNo).amount).toBe(170);
    });
    

    it('should get reset all Transactions.', function() {
        var controller = createController();
        expect(scope.transactions).toBeDefined();
        expect(scope.transactions.length).toBe(4);
        expect(AccountService.getAccount(accountNo).amount).toBe(170);

        scope.reset();
        expect(scope.transactions).not.toBeDefined();
        expect(AccountService.getAccount(accountNo).amount).toBe(0);

    });
    

});