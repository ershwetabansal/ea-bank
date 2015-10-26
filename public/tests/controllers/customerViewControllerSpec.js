describe('Customer View Controller Testing.', function() {
  'use strict';


  beforeEach(function() {
    module('BankApp');
  });

    var scope, createController,UserService,AccountService,TxService,CustomerDataService;


    beforeEach(inject(function ($rootScope, $state, $controller,User,Account,Transaction,CustomerData) {
        scope = $rootScope.$new();
        AccountService = Account;
        UserService = User;
        TxService = Transaction;
        CustomerDataService = CustomerData;

        createController = function() {
            return $controller('customerViewCtrl', {
                '$scope': scope
            });
        };
    }));

    var uniqueId;
    var user;
    beforeEach(function(){
      user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = UserService.addUser(user);
      
    });

    it('should verify Customer Data service.', function() {
        var controller = createController();
        scope.custId = uniqueId;
        scope.showAccount();

        var userObj = CustomerDataService.getUser();
        expect(userObj).toBeDefined();
        expect(userObj.id).toBe(uniqueId);

        var acctObj = CustomerDataService.getAccount();
        expect(acctObj).not.toBeDefined();
                
    });


});