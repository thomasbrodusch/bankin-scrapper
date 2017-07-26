/**
 * Scrapper Service
 *
 * Perform specific scrapping actions
 * @author Thomas Brodusch
 */

var Sanitizer = require('./Sanitizer.js');
var SanitizerService = new Sanitizer();

// Constructor.
Scrapper = function(casper){
	this.casper = casper;
}

/**
 * accountDetails Scrap bank accounts details
 * @param  [Array] or String targetedAccountType Target DOM related to an account
 * @param  {Object} scrappingSelectors  DOM selectors defined in the Bank source blueprint
 * @return [Array]                     Array of accounts
 */
Scrapper.prototype.accountDetails = function(targetedAccountType, scrappingSelectors){

	var accountsDetails = [];

	// If we have an array of targets...
	if (Array.isArray(targetedAccountType)) {
		for (var i = targetedAccountType.length - 1; i >= 0; i--) {
			// ... Call this method recursively :)
			accountsDetails.push(this.accountDetails(targetedAccountType[i], scrappingSelectors)[0]);
		}
	} else {
		// If we have an unique target (string).
		for (var i = 1; i < this.casper.getElementsInfo(targetedAccountType.target).length + 1; i++) {

			// Set the selectors, check if an account type has a custom details account target selector or target the default details selector.
			var selectors = {
				accountName: targetedAccountType.hasOwnProperty('details.accountName') ? targetedAccountType.details.accountName :  scrappingSelectors.account.detailed.default.details.accountName,
				accountNumber: targetedAccountType.hasOwnProperty('details.accountNumber') ? targetedAccountType.details.accountNumber :  scrappingSelectors.account.detailed.default.details.accountNumber,
				balance: {
					actual:  targetedAccountType.hasOwnProperty('details.actual') ? targetedAccountType.details.balance.actual :  scrappingSelectors.account.detailed.default.details.balance.actual,
					toCome: targetedAccountType.hasOwnProperty('details.toCome') ? targetedAccountType.details.balance.toCome :  scrappingSelectors.account.detailed.default.details.balance.toCome
				}
			};

			accountsDetails.push({
				accountName: SanitizerService.accountName(this.casper.fetchText(targetedAccountType.target+":nth-child("+ i +") > "+ selectors.accountName )),
				accountNumber: SanitizerService.accountNumber(this.casper.fetchText(targetedAccountType.target+":nth-child("+ i +") > "+ selectors.accountNumber)),
				balance: {
					actual: SanitizerService.amount(this.casper.fetchText(targetedAccountType.target+":nth-child("+ i +") > "+ selectors.balance.actual)),
					toCome: SanitizerService.amount(this.casper.fetchText(targetedAccountType.target+":nth-child("+ i +") > "+ selectors.balance.toCome))
				}
			});
		}		
	}
		
	return accountsDetails;
}

module.exports = Scrapper;