/**
 * Test Login on BNB Paribas
 */

var Account = require('../../Account.js');
var bnpparibas = require('../../blueprints/bankSources/bnpparibas.js');
var FAKE_CLIENT = {
	accountNumber: '123',
	accountSecret: '123456'
};

casper.test.begin('Login Test - BNP Paribas', 1, function(test) {

	var newClient = new Account(bnpparibas, FAKE_CLIENT, casper);

	newClient.login(function(isLogged){
		test.assert(isLogged, 'Logged in '+ bnpparibas.name +' on account: '+ FAKE_CLIENT.accountNumber +' and secret: '+ FAKE_CLIENT.accountSecret +' with success !');
		test.done();
	});
});
