describe('Customer List Controller Testing.', function() {
  'use strict';


  beforeEach(function() {
    module('BankApp');
  });

    var scope, createController,UserService,AccountService,TxService;


    beforeEach(inject(function ($rootScope, $controller,User,Account,Transaction) {
        scope = $rootScope.$new();
        AccountService = Account;
        UserService = User;
        TxService = Transaction;

        createController = function() {
            return $controller('listCustomerCtrl', {
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

    it('should delete user.', function() {
        expect(UserService.getUser(uniqueId)).toBeDefined();
        
        var controller = createController();
        scope.deleteCust(user);

        expect(UserService.getUser(uniqueId)).not.toBeDefined();
    });


});