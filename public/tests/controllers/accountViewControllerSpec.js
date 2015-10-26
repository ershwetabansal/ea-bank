describe('Account view Controller Testing.', function() {
  'use strict';


  beforeEach(function() {
    module('BankApp');
  });

    var scope, createController,UserService,AccountService,TxService,CustomerDataService;


    beforeEach(inject(function ($rootScope,$state, $controller,User,Account,Transaction,CustomerData) {
        scope = $rootScope.$new();
        AccountService = Account;
        UserService = User;
        TxService = Transaction;
        CustomerDataService = CustomerData;

        createController = function() {
            return $controller('accountCtrl', {
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
      CustomerDataService.setUser(user);
    });

    it('should show correct amount and currency.', function() {
        accountNo = AccountService.createAccount(uniqueId,"dollar");
        CustomerDataService.setAccount(AccountService.getAccount(accountNo));
        var controller = createController();
        expect(scope.accountNo).toBe(accountNo);
        expect(scope.currency).toBe("dollar");
        expect(scope.amount).toBe(0);
    });

    it('should test no account scenario.', function() {
        var controller = createController();
        expect(scope.accountNo).not.toBeDefined();
        expect(scope.currency).not.toBeDefined();
        expect(scope.amount).not.toBeDefined();
        expect(scope.noAccount).toBeTruthy();
    });

    it('should select first account.', function() {
        var accountNo1 = AccountService.createAccount(uniqueId,"dollar");
        var accountNo2 = AccountService.createAccount(uniqueId,"Pound");
        
        var controller = createController();
        expect(scope.accountNo).toBe(accountNo1);
        expect(scope.currency).toBe("dollar");
        expect(scope.amount).toBe(0);
    });


    it('should be able to select any account.', function() {
        var accountNo1 = AccountService.createAccount(uniqueId,"dollar");
        var accountNo2 = AccountService.createAccount(uniqueId,"Pound");
        var accountNo3 = AccountService.createAccount(uniqueId,"Rupee");
        
        var controller = createController();
        scope.accountNo = accountNo2;
        scope.selectAcct();
        expect(scope.currency).toBe("Pound");

        scope.accountNo = accountNo1;
        scope.selectAcct();
        expect(scope.currency).toBe("dollar");

        scope.accountNo = accountNo3;
        scope.selectAcct();
        expect(scope.currency).toBe("Rupee");

    });
    


});