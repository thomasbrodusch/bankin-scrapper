/**
 * Test to fetch bank account informations on BNB Paribas Client account
 */

var Account = require('../../Account.js');
var bnpparibas = require('../../blueprints/bankSources/bnpparibas.js');
var FAKE_CLIENT = {
	accountNumber: '123',
	accountSecret: '123456'
};

function receiveJSON(JSON_balance){
	try {
        JSON.parse(JSON_balance);
    } catch (e) {

        return false;
    }
    console.log(JSON_balance);
    return true;
};

function hasGlobalBalance(JSON_balance){
	try {
		Object.keys(JSON_balance.bank.accounts.globalSituation).map(function(objectKey, index) {
		    if (JSON_balance.bank.accounts.globalSituation[objectKey] == '') {
		    	throw objectKey;
		    }else {
		    	console.log(objectKey + ' > ' + JSON_balance.bank.accounts.globalSituation[objectKey]);
		    }
		});
	} catch (e) {
		console.log('(!) Fail test, ' + e + ' is empty.');
		return false;
	}
	return true;
};

function hasGlobalAccounts(JSON_balance){
	try {

		Object.keys(JSON_balance.bank.accounts.detailed).map(function(objectKey, index) {
		    if (JSON_balance.bank.accounts.detailed[objectKey].length == 0 ) {
		    	throw objectKey;
		    }else {
		    	console.log(objectKey + ' > ' + JSON_balance.bank.accounts.detailed[objectKey].length + ' accounts.');
		    }

		});
	} catch (e) {
		console.log('(!) Fail test, ' + e + ' is empty.');
		return false;
	}
	return true;
};


casper.test.begin('Fetch global bank account informations - BNP Paribas', 3, function(test) {

	casper.start('https://mabanque.bnpparibas/sitedemo/', function(){
		// Bypass Login step on Bank account panel.
		var newClient = new Account(bnpparibas, FAKE_CLIENT, casper);

		// Fetch Account Balance and prompt it.
		newClient.getBalance(function(parsedJSON_balance){		
			var JSON_balance = JSON.stringify(parsedJSON_balance);

			test.assert(receiveJSON(JSON_balance), "Fetch the whole Account information in a JSON.");
			test.assert(hasGlobalBalance(parsedJSON_balance), "Fetched all balance global summary with success !");
			test.assert(hasGlobalAccounts(parsedJSON_balance), "Fetched all balance detailed summary with success !");

		});
	}).run(function(){
		test.done()
	});
});