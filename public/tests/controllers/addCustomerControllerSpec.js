describe('Add Customer Controller Testing.', function() {
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
            return $controller('addCustomerCtrl', {
                '$scope': scope
            });
        };
    }));

    var uniqueId;
    var user;
    beforeEach(function(){
      user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      
    });

    it('should add customer.', function() {
        var controller = createController();
        scope.fName = user.fName;
        scope.lName = user.lName;
        scope.postCd = user.postCd;
        scope.addCustomer();

        var userObj = UserService.getUsers();
        expect(userObj).toBeDefined();
        expect(userObj.length).toBe(1);
                
    });

    it('should not allow duplicate customers.', function() {
        UserService.addUser(user);
        var userObj = UserService.getUsers();
        expect(userObj).toBeDefined();
        expect(userObj.length).toBe(1);
         
        var controller = createController();
        scope.fName = user.fName;
        scope.lName = user.lName;
        scope.postCd = user.postCd;
        scope.addCustomer();

        userObj = UserService.getUsers();
        expect(userObj).toBeDefined();
        expect(userObj.length).not.toBe(2);
                
    });


});