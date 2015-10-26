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
            return $controller('depositCtrl', {
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

    it('should deposit amount.', function() {
        var controller = createController();
        scope.amount = 50;
        scope.deposit();

        var obj = AccountService.getAccount(accountNo);
        expect(obj).toBeDefined();
        expect(obj.amount).toBe(50);
        
        expect(scope.message).toBe('Deposit Successful');
    });


});