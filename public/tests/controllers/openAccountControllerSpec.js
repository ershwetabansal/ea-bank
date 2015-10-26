describe('Open Account Controller Testing.', function() {
  'use strict';


  beforeEach(function() {
    module('BankApp');
  });

    var scope, createController,UserService,AccountService;


    beforeEach(inject(function ($rootScope, $controller, $timeout,Account,User) {
        scope = $rootScope.$new();
        AccountService = Account;
        UserService = User;

        createController = function() {
            return $controller('openAccountCtrl', {
                '$scope': scope
            });
        };
    }));

    var uniqueId;
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = UserService.addUser(user);
    });

    it('should add an account.', function() {
        var controller = createController();
        scope.custId = uniqueId;
        scope.currency = "Pound";

        scope.process();
        var accounts = UserService.getUserAccounts(uniqueId);
        expect(accounts).toBeDefined();
        expect(accounts.length).toBe(1); 
        var obj = AccountService.getAccount(accounts[0]);
        expect(obj).toBeDefined();
    });


});