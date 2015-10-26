describe('Deposit Controller Testing.', function() {
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
            return $controller('withdrawlCtrl', {
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
    });

    it('should not withdraw amount when balance is zero.', function() {
        var controller = createController();
        scope.amount = 50;
        scope.withdrawl();

        var obj = AccountService.getAccount(accountNo);
        expect(obj).toBeDefined();
        expect(obj.amount).toBe(0);
        
        expect(scope.message).toBe('Transaction Failed. You can not withdraw amount more than the balance.');
        expect(TxService.getTransactions(uniqueId,accountNo).length).toBe(0);
    });
    it('should withdraw amount', function() {
        TxService.deposit(uniqueId,accountNo,50);
        var controller = createController();
        scope.amount = 10;
        scope.withdrawl();

        var obj = AccountService.getAccount(accountNo);
        expect(obj).toBeDefined();
        expect(obj.amount).toBe(40);
        
        expect(scope.message).toBe('Transaction successful.');

        expect(TxService.getTransactions(uniqueId,accountNo).length).toBe(2);
    });
    


});