describe('Bank User Service Testing.', function() {
  'use strict';

  // Service instance
  var service;

  beforeEach(function() {
    module('BankApp');
  });
  beforeEach(
      inject(function(User){
        service = User;
      }));


  describe('should be able to add a new user.', function() {
    
    var uniqueId;
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = service.addUser(user);
    });

    it('should check the existence of user.', function() {
        var user = service.getUser(uniqueId);
        expect(user).toBeDefined();
        expect(user.fName).toBe('Harry');
        expect(user.lName).toBe('Potter');
        expect(user.postCd).toBe('E725JB');
    });
  });

  describe('should verify the support of multiple users.', function() {
    var userid1;
    beforeEach(function(){
      var user1 = {fName : "Hermoine", lName : "Granger", postCd : "E859AB"};
      userid1 = service.addUser(user1);

      var user2 = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      service.addUser(user2);

      var user3 = {fName : "Ron", lName : "Weasly", postCd : "E55555"};
      service.addUser(user3);
    });
    
    it('should check number of users.', function() {
        var users = service.getUsers();
        expect(users).toBeDefined();
        expect(users.length).toBe(3);
        expect(users[0].fName).toBe("Hermoine");
        expect(users[1].fName).toBe("Harry");
        expect(users[2].fName).toBe("Ron");
    });

    it('should be able to delete a user.', function() {
        service.deleteUser(userid1);
        var user = service.getUser(userid1);      
        expect(user).not.toBeDefined();  
    });

  });

  describe('should be able to add an account for user.', function() {
    
    var uniqueId;
    var accountNumber = "12345";
    
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = service.addUser(user);
      service.addAccount(uniqueId,accountNumber);
    });

    it('should check the existence of user.', function() {
        var user = service.getUser(uniqueId);
        expect(user).toBeDefined();
        expect(user.fName).toBe('Harry');
        expect(user.lName).toBe('Potter');
        expect(user.postCd).toBe('E725JB');
        expect(user.accountNo[0]).toBe(accountNumber);
    });
  });

  describe('delete functionality',function() {
    var uniqueId;
    
    beforeEach(function(){
      var user = {fName : "Harry", lName : "Potter", postCd : "E725JB"};
      uniqueId = service.addUser(user);
    });

    it('should check the existence of user.', function() {
        var user = service.getUser(uniqueId);
        expect(user).toBeDefined();

        service.deleteUser(uniqueId);

        user = service.getUser(uniqueId);
        expect(user).not.toBeDefined();
    });
  }); 
});