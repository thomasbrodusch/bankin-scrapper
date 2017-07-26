var casper = require('casper').create({
	viewportSize: {
	    width: 1366,
	    height: 768
	}
});
var bnpparibas = require('./blueprints/bankSources/bnpparibas.js');
var Account = require('./Account.js');

console.log('██████╗  █████╗ ███╗   ██╗██╗  ██╗██╗███╗   ██╗    ███████╗ ██████╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ ');
console.log('██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝██║████╗  ██║    ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗');
console.log('██████╔╝███████║██╔██╗ ██║█████╔╝ ██║██╔██╗ ██║    ███████╗██║     ██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝');
console.log('██╔══██╗██╔══██║██║╚██╗██║██╔═██╗ ██║██║╚██╗██║    ╚════██║██║     ██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗');
console.log('██████╔╝██║  ██║██║ ╚████║██║  ██╗██║██║ ╚████║    ███████║╚██████╗██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║');
console.log('╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝');
console.log("	### Bank Scrapper for Bankin' by Thomas Brodusch ###");                                                                                                         


if (casper.cli.get('account') != undefined && casper.cli.get('secret') != undefined)
{
	var client = {
		accountNumber: casper.cli.get('account'),
		accountSecret: casper.cli.get('secret'),
	};

	var newInstance = new Account(bnpparibas, client, casper);

	// Let's roll !
	newInstance.scrap(function(JSON_balance){
		console.log("> We have the JSON's account balance :) \n");
		console.log(JSON_balance);
	});	

}
else {
	console.log('Error:  No account informations provided, please give account information.');
	console.log('ex: npm start -- --account=123 --secret=123456 ')
}