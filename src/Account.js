/**
 * Class Account
 * @author Thomas Brodusch
 */

var AccountSummary = require('./blueprints/AccountSummary.js');
var Sanitizer = require('./services/Sanitizer.js');
var Scrapper = require('./services/Scrapper.js');

var SanitizerService = new Sanitizer();
var ScrapperService = null;

// Contructor.
Account = function(sourceBank, clientAccount, casper){
	this.bank = sourceBank;
	this.client = {
		accountNumber: clientAccount.accountNumber.toString(),
		accountSecret: clientAccount.accountSecret.toString()
	};
	this.casper = casper;
	ScrapperService = new Scrapper(casper);
};

/**
 * Scrap  Launch main scrapping process.
 * @param  {Function} Callback to pass the result of scrapping process
 * @return String  Return a stringify JSON Object of the targeted bank via Callback cb().
 */
Account.prototype.scrap = function(cb){
	this.login(function(isLogged){
		console.log('> Well logged in :)');
		if( isLogged ){
			this.getBalance(function(JSON_balance){
				return cb(SanitizerService.accountJSON(JSON_balance));
			}.bind(this));
		}
	}.bind(this));
};

/**
 * login  Login to a bank account using user credentials.
 * @param  {Function} 	Callback to pass the result of login process
 * @return Boolean  Return variable isLogged (boolean) via Callback cb() to indicate if we are well logged.
 */
Account.prototype.login = function(cb){
	console.log('\n#1 LOGIN PROCESS ');
	console.log('____________________\n');
	console.log('Trying to log in bank "' + this.bank.name + '" ...');
	
	console.log('\n@@@@@@@@@ Credentials @@@@@@@@@@@@');
	console.log('Account number: ', this.client.accountNumber);
	console.log('Account secret: ', this.client.accountSecret);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n');

	
	var _self = this;

	var fillAccountNumber = {};
	fillAccountNumber[_self.bank.scrappingSelectors.login.clientNumber.input] = this.client.accountNumber;

	var fillAccountSecret = {};
	fillAccountSecret[_self.bank.scrappingSelectors.login.clientSecret.input] = this.client.accountSecret;


	// Account Number
	this.casper.start(this.bank.endpointUrl, function() {
		this.sendKeys(_self.bank.scrappingSelectors.login.clientNumber.input, _self.client.accountNumber);
		this.capture('screenshots/login/login.png');
	});

	// Account secret
	this.casper.waitForSelector('a.password-key', function () {
		// We fake 6 clicks on the digits to make the submit button available.
		for (var i = 0; i < 6; i++) {
			casper.mouseEvent('click', 'a.password-key');
		}
	    this.capture('screenshots/login/fake_click_grid.png'); 
	    this.sendKeys(_self.bank.scrappingSelectors.login.clientNumber.input, _self.client.accountNumber);

	});
	
	// Submit login form
	this.casper.then(function(){
		this.click(_self.bank.scrappingSelectors.login.submit.button);
	});

	return this.casper.then(function() {
	    console.log('> Loggin information submitted');
	    this.capture('screenshots/login/logged_in.png');
	    this.waitForSelector(_self.bank.scrappingSelectors.login.checkLoggedIn,
		    function pass () {
		        cb(true);
		    },
		    function fail () {
		        cb(false);
		    },
		    3000 // Max waiting 3 seconds.
		);
	}).run();
};

/**
 * getBalance Fetch some bank account balance informations.
 * @param  {Function} Callback to pass the result of getBalance process
 * @return {Object}   Return JSON Object of bank account balances via Callback cb() 
 */
Account.prototype.getBalance = function(cb){
	console.log('\n#2 FETCH BANK ACCOUNTS BALANCES ');
	console.log('________________________________\n');
	
	var _self = this;	
	var summary = AccountSummary; 

	// Fill bank infos
	summary.bank.name = this.bank.name;
	summary.bank.clientAccount = this.client.accountNumber;

	// Global Summary balances
	// this.casper.waitForSelector('a.password-key', function () {
	this.casper.then(function(){
		this.capture('screenshots/account/main.png');
		console.log('> Account page, new location is ' + this.getCurrentUrl());

		// Enter in Iframe
		if ( _self.bank.iframe.hasIframe ) {
			this.page.switchToChildFrame(_self.bank.iframe.position);
		}
		
		Object.keys(_self.bank.scrappingSelectors.account.global).map(function(objectKey, index) {
		    summary.bank.accounts.globalSituation[objectKey] = SanitizerService.amount(this.casper.fetchText(_self.bank.scrappingSelectors.account.global[objectKey]));
		});
	});

	// Detailed Summary balances
	this.casper.then(function(){
		Object.keys(_self.bank.scrappingSelectors.account.detailed).map(function(objectKey, index) {
		    if (objectKey != 'default') {
		    	summary.bank.accounts.detailed[objectKey] = ScrapperService.accountDetails(_self.bank.scrappingSelectors.account.detailed[objectKey], _self.bank.scrappingSelectors);
		    }
		}.bind(this));
	});

	return this.casper.then(function(){
		cb(summary);
	});
};

module.exports = Account;