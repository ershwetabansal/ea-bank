/** Setting the angular module **/

angular.module('BankApp').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('main', {
            url: '',
            templateUrl: 'views/main.html',
            abstract:true,
            controller: function($scope,$state){
                $scope.home = function() {
                    $state.transitionTo('main.options');
                }
                $scope.byebye = function() {
                    $state.transitionTo('main.custView');
                }
                
            }
        })

        .state('main.options', {
            url: '/login',
            templateUrl: 'views/options.html',
            controller: function($scope,$state){
                $scope.$parent.logout = false;
                $scope.manager = function() {
                    $state.transitionTo('main.mgrView');
                }
                $scope.customer = function() {
                    $state.transitionTo('main.custView');                    
                }
            }
        })

		.state('main.mgrView', {
            url: '/manager',
            templateUrl: 'views/managerView.html',
            controller: function($scope,$state,$timeout,User,Account){
                $scope.$parent.logout = false;
                $scope.addCust = function() {
                    $state.transitionTo('main.mgrView.add');
                    $scope.btnClass1 = 'btn-primary';
                    $scope.btnClass2 = '';
                    $scope.btnClass3 = '';
                    
                }
                $scope.openAccount = function() {
                    $state.transitionTo('main.mgrView.account');   
                    $scope.btnClass1 = '';
                    $scope.btnClass2 = 'btn-primary';
                    $scope.btnClass3 = '';
                    

                }
                $scope.showCust = function() {
                    $state.transitionTo('main.mgrView.list');     
                    $scope.btnClass1 = '';
                    $scope.btnClass2 = '';
                    $scope.btnClass3 = 'btn-primary'; 

                }

            }
        })

   		.state('main.mgrView.add', {
            url: '/addCust',
            templateUrl: 'views/newCustomer.html',
            controller: function($scope,User){
                $scope.$parent.logout = false;
                $scope.addCustomer = function() {
                    var user = {};
                    user.fName = $scope.fName;
                    user.lName = $scope.lName;
                    user.postCd = $scope.postCd;
                    var id = User.addUser(user);
                    if (id == 0) {
                        alert("Please check the details. Customer may be duplicate.");
                    } else {
                        alert("Customer added successfully with customer id :"+id);
                        $scope.fName = "";
                        $scope.lName = "";
                        $scope.postCd = "";
                        $timeout(function() {
                            Account.saveObj();
                        }, 0);
                    }
                }

            }
        })

        .state('main.mgrView.account', {
            url: '/openAccount',
            templateUrl: 'views/openAccount.html',
            controller: function($scope,Account,User){
                $scope.Customers = User.getUsers();
                $scope.$parent.logout = false;
                $scope.process = function() {
                    var acctNo = Account.createAccount($scope.custId,$scope.currency);
                    if (acctNo == 0) {
                        alert("Something went wrong. Account can not be opened.");
                    } else {
                        alert("Account created successfully with account Number :"+acctNo);
                        $scope.currency = "";
                        $scope.custId = "";
                        $timeout(function() {
                            User.saveObj();
                            Account.saveObj();
                        }, 0);
                    }
                }

            }
        })

   		.state('main.mgrView.list', {
            url: '/list',
            templateUrl: 'views/customerList.html',
            controller: function($scope,User) {
                $scope.$parent.logout = false;
                $scope.Customers = User.getUsers();
                $scope.deleteCust = function(cust) {
                    Account.deleteUser(cust.id);
                    Transaction.deleteUser(cust.id);
                    User.deleteUser(cust.id);
                    
                    $scope.Customers = User.getUsers();
                    $timeout(function() {
                        User.saveObj();
                        Account.saveObj();
                        Transaction.saveObj();
                    }, 0);
                }
            }
        })

		.state('main.custView', {
            url: '/customer',
            templateUrl: 'views/customerView.html',
            controller: function($scope,$state,User,Account,CustomerData) {
                $scope.$parent.logout = false;
                $scope.custId = '';
                $scope.accountNo = '';
                $scope.Customers = User.getUsers();
                $scope.Accounts = {};
                for (var i=0,len = $scope.Customers.length; i <len ; i++){
                    var accounts = User.getUserAccounts($scope.Customers[i].id);
                    $scope.Accounts[$scope.Customers[i].id] = accounts;
                }
                $scope.showAccount = function() {
                    CustomerData.setUser(User.getUser($scope.custId));
                    CustomerData.setAccount(Account.getAccount($scope.accountNo));
                    $state.transitionTo('main.account');
                }

            }
        })

   		.state('main.account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: function($scope,$state,CustomerData,User,Account,Transaction){
                $scope.$parent.logout = true;
                var acctObj = CustomerData.getAccount();
                var userObj = CustomerData.getUser();
                $scope.accountNo = acctObj.accountNo;
                $scope.currency = acctObj.currency;
                $scope.user = userObj.fName + " " + userObj.lName;
                $scope.amount = acctObj.amount;

                $scope.$on('amountChg', function(event, data) { 
                    var acctObj = CustomerData.getAccount(); 
                    $scope.amount = acctObj.amount;
                });
                $scope.transactions = function(){
                    $state.transitionTo('main.account.list');
                    $scope.btnClass1 = 'btn-primary';
                    $scope.btnClass2 = '';
                    $scope.btnClass3 = '';
                }
                $scope.deposit = function(){
                    $state.transitionTo('main.account.deposit');
                    $scope.btnClass1 = '';
                    $scope.btnClass2 = 'btn-primary';
                    $scope.btnClass3 = '';
                    
                }
                $scope.withdrawl = function(){
                    $state.transitionTo('main.account.withdrawl');
                    $scope.btnClass1 = '';
                    $scope.btnClass2 = '';
                    $scope.btnClass3 = 'btn-primary';
                    
                }
                $scope.reset = function() {
                    Transaction.deleteTx(userObj.id,acctObj.accountNo);
                    $scope.amount = 0;
                    $scope.$broadcast('refresh');
                    $timeout(function() {
                        Account.saveObj();
                        Transaction.saveObj();
                    }, 0);
                }
            }
        })

   		.state('main.account.deposit', {
            url: '/depositTx',
            templateUrl: 'views/depositTx.html',
            controller: function($scope,$timeout,Account,Transaction,CustomerData) {
                $scope.$parent.logout = true;
                $scope.amount = "";
                $scope.deposit = function() {
                    var txObj = Transaction.deposit(CustomerData.getUser().id,CustomerData.getAccount().accountNo,$scope.amount);
                    if (txObj.success) {
                        $scope.message = "Deposit Successful";
                        $scope.$emit('amountChg');
                    } else {
                        $scope.message = "Something went wrong. Please try again.";
                    }
                    $scope.amount = "";
                    $timeout(function() {
                        Account.saveObj();
                        Transaction.saveObj();
                    }, 0);
                }
            }
        })

   		.state('main.account.withdrawl', {
            url: '/withdrawlTx',
            templateUrl: 'views/withdrawlTx.html',
            controller: function($scope,$timeout,Account,Transaction,CustomerData) {
                $scope.$parent.logout = true;
                $scope.amount = "";
                $scope.withdrawl = function() {
                    var txObj = Transaction.withdrawl(CustomerData.getUser().id,CustomerData.getAccount().accountNo,$scope.amount);
                    if (!txObj.success) {
                        $scope.message = "Transaction Failed. You can not withdraw amount more than the balance.";
                    } else {
                        $scope.message = "Transaction successful";
                        $scope.$emit('amountChg');
                    } 
                    $scope.amount = "";
                    $timeout(function() {
                        Account.saveObj();
                        Transaction.saveObj();
                    }, 0);
                }
            }
        })

        .state('main.account.list', {
            url: '/listTx',
            templateUrl: 'views/listTx.html',
            controller: function($scope,Transaction,CustomerData){
                $scope.$on('refresh',function(event,data) {
                    $scope.transactions = Transaction.getTransactions(CustomerData.getUser().id,CustomerData.getAccount().accountNo);
                });
                $scope.transactions = Transaction.getTransactions(CustomerData.getUser().id,CustomerData.getAccount().accountNo);
            }
        })
        ;


});