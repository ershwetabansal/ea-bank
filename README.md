Purpose : A bank account application using Angular.js
A simple bank account application that allows the fictitious ‘EA
Bank’ to create customers, who can have a balance in a given currency. Customer can
also use the system to add and remove amounts to and from their account. Once a
deposit or withdrawal takes place, it should be listed along with the date and time the
transaction took place.

Used Technology

1) Angular.js for client side code 
2) node.js to start server 
3) Jasmine to test the service 
4) Karma to run test cases


$ bower install
$ npm install
$ karma start to test the services

To run application
Run $ npm install
Run $ node server/index.js
Open http://localhost:3000/bank in your browser.

Alternatively check plunker http://plnkr.co/edit/6DBKfb?p=preview

Instructions - 
1) With Manager login, customers can be added and accounts can be opened.
2) One customer can have multiple same currency accounts.
3) Some mock up data has been updated on load of the application, as there is no server side implementation.
4) For First account of first customer, around 200 transactions have been loaded for testing transaction summary functionality.
5) mock up service works only for the first time load, then the data is picked up from localStorage. If transactions are reset then to load the mock data, localStorage will have to be cleared.
6) No confirmation popup has been placed in this version on click of reset/delete buttons. So please click the buttons when you mean to.
