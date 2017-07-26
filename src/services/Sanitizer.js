/**
 * Sanitizer Service
 * 
 * Clean scrapped data
 * @author Thomas Brodusch
 */

Sanitizer = function(){
	/*	
		Used Regex explanations :
		------------------------
		/(^|\s+)($|\s+)/g 		-> Regex to Match only spaces before and after string
	 	/(^|\s+)\D($|\s+)/g 	-> Regex to Match only spaces before and after non-digit string
		/(?!\*)\D/g 			-> Regex to Match only non digits char (escaping "*")
	*/

	this.regex = {
		amount: /(^|\s+)($|\s+)/g,
		account: {
			name: /(^|\s+)\D($|\s+)/g,
			number: /(?!\*)\D/g
		}
	};
}

/**
 * accountName Sanitize Account Name - No space before and after
 * @param  String stringAccountName Account Name
 * @return String  Sanitized Account name
 */
Sanitizer.prototype.accountName = function(stringAccountName) {
	return stringAccountName.replace(this.regex.account.name, '');
}

/**
 * accountNumber Sanitize Account Number - No space before and after (keep **** in account number)
 * @param  String stringAccountNumber Account Number
 * @return String  Sanitized Account number
 */
Sanitizer.prototype.accountNumber = function(stringAccountNumber) {
	return stringAccountNumber.replace(this.regex.account.number, '');
}

/**
 * amount Sanitize an account amount - No space before and after, keep the currency
 * @param  String stringAmount Account Amount
 * @return String  Sanitized account amount
 */
Sanitizer.prototype.amount = function(stringAmount) {
	return stringAmount.replace(this.regex.amount, '');
}

/**
 * accountJSON Sanitize Account JSON - Spacing and tab in JSON
 * @param  {Object} JSON JSON Object representation of a bank account
 * @return String  Sanitized JSON 
 */
Sanitizer.prototype.accountJSON = function(JSON_balance){
	return JSON.stringify(JSON_balance, null, ' ');
}

module.exports = Sanitizer;