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
                    
                }
                $scope.openAccount = function() {
                    $state.transitionTo('main.mgrView.account');   
                    
                }
                $scope.showCust = function() {
                    $state.transitionTo('main.mgrView.list');     
                }

            }
        })

   		.state('main.mgrView.add', {
            url: '/addCust',
            templateUrl: 'views/newCustomer.html',
            controller: function($scope,User,$timeout){
                $scope.$parent.logout = false;
                $scope.$parent.btnClass1 = 'btn-primary';
                $scope.$parent.btnClass2 = '';
                $scope.$parent.btnClass3 = '';
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
                            User.saveObj();
                        }, 0);
                    }
                }

            }
        })

        .state('main.mgrView.account', {
            url: '/openAccount',
            templateUrl: 'views/openAccount.html',
            controller: function($scope,$timeout,Account,User){
                $scope.Customers = User.getUsers();
                $scope.$parent.btnClass1 = '';
                $scope.$parent.btnClass2 = 'btn-primary';
                $scope.$parent.btnClass3 = '';

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
                $scope.$parent.btnClass1 = '';
                $scope.$parent.btnClass2 = '';
                $scope.$parent.btnClass3 = 'btn-primary';
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
                $scope.Customers = User.getUsers();
                $scope.showAccount = function() {
                    CustomerData.setUser(User.getUser($scope.custId));
                    CustomerData.setAccount();
                    $state.transitionTo('main.account');
                }

            }
        })

   		.state('main.account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: function($scope,$state,CustomerData,User,Account,Transaction){
                $scope.$parent.logout = true;
                
                var userObj = CustomerData.getUser();
                $scope.user = userObj.fName + " " + userObj.lName;
                $scope.Accounts = User.getUserAccounts(userObj.id);
                $scope.noAccount = false;
                if ($scope.Accounts && $scope.Accounts.length > 0) {
                    var acctObj = CustomerData.getAccount();
                    if (typeof(acctObj) !== "undefined") {
                        $scope.accountNo = acctObj.accountNo;
                        $scope.currency = acctObj.currency;
                        $scope.amount = acctObj.amount;
                    } else {
                        $scope.accountNo = $scope.Accounts[0];
                        accountSelected();
                    }
                } else {
                    $scope.noAccount = true;
                }
                $scope.$on('amountChg', function(event, data) { 
                    var acctObj = CustomerData.getAccount(); 
                    $scope.amount = acctObj.amount;
                });
                $scope.selectAcct = function() {
                    accountSelected();
                    $scope.$broadcast('refresh');               
                }

                $scope.transactions = function(){
                    $state.transitionTo('main.list');
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
                function accountSelected () {
                    var acctObj = Account.getAccount($scope.accountNo);
                    $scope.currency = acctObj.currency;
                    $scope.amount = acctObj.amount;
                    CustomerData.setAccount(acctObj);                      
                }
                
            }
        })

   		.state('main.account.deposit', {
            url: '',
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
            url: '',
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

        .state('main.list', {
            url: '/listTx',
            templateUrl: 'views/listTx.html',
            controller: function($scope,$timeout,$state,$filter,$anchorScroll, $location,Transaction,Account,CustomerData){
                $scope.$parent.logout = true;
                $scope.left = false;
                $scope.right = true;
                var x = 0;
                
                $scope.$on('refresh',function(event,data) {
                    $scope.transactions = Transaction.getTransactions(CustomerData.getUser().id,CustomerData.getAccount().accountNo);
                });
                var txs = Transaction.getTransactions(CustomerData.getUser().id,CustomerData.getAccount().accountNo);

                if (typeof(txs) != "undefined" && txs != null && txs.length > 0 ){
                    
                    $scope.transactions = $filter('orderBy')(txs,'date',false);
                    $scope.startDate = $scope.transactions[0].date;
                    $scope.end = $scope.transactions[$scope.transactions.length-1].date;
                    $scope.showDate = true;  
                    if ($scope.startDate !== $scope.end) {
                        $scope.minSDate = $scope.transactions[0].date;
                        $scope.maxSDate = $scope.end;
                        $scope.minEDate = $scope.startDate;
                        $scope.maxEDate = new Date();                        
                    }
                } else {
                    
                    $scope.transactions = [];
                    $scope.showDate = false;
                }

                $scope.reset = function() {
                    Transaction.deleteTx(CustomerData.getUser().id,CustomerData.getAccount().accountNo);
                    $scope.amount = 0;
                    $scope.$broadcast('refresh');
                    $timeout(function() {
                        Account.saveObj();
                        Transaction.saveObj();
                    }, 0);
                }

                $scope.scrollLeft = function() {
                    x = x - 8;
                    var id = 'anchor';
                    if (x > 0) {
                        id = id + x; 
                    } 
                    $timeout(function() {
                        $location.hash(id);
                        $anchorScroll();
                    });                        
                    if (x <= 0){
                        $scope.left = false;
                    }

                }
                $scope.scrollRight = function() {
                    $scope.left = true;
                    if (x==0) x = 5;
                    else x = x + 8;
                    if (typeof($('#anchor'+x).val()) === "undefined") {
                        if (x==5) {
                            x=0;
                            $scope.left = false;
                        } else x = x - 8;
                    } else {
                        $timeout(function() {
                            $location.hash("anchor"+x);
                            $anchorScroll();
                        });                        
                    }
                }
                $scope.scrollTop = function() {
                    x=0;
                    $timeout(function() {
                        $location.hash("anchor");
                        $anchorScroll();
                    });   
                }
                $scope.back = function() {
                    $state.transitionTo('main.account');
                }
            }
        })
        ;


});
