/**
 * Bankin scrapping blueprint for source BNP Paribas.
 * export return JSON {Object}
 */

module.exports = {
	name: 'BNP Paribas',
	endpointUrl: 'https://mabanque.bnpparibas/sitedemo/ident.html',
	iframe: {
		hasIframe: true,
		position: 0
	},
	scrappingSelectors: {
		login: {
			clientNumber: {
				form: 'form[name=logincanalnet]',
				input: 'form[name=logincanalnet] input[name=ch1]',
			},
			clientSecret: {
				form: 'form[name=logincanalnetbis]',
				inputs: 'a.password-key[data-value=',
				input: 'form[name=logincanalnetbis] input[name=ch2]'
			},
			submit: {
				button: 'button#submitIdent'
			},
			checkLoggedIn: '#main-iframe'
		},
		account: {
			global: {
				checkings: '#udc-famille-ancre > ul > li.famille0 > strong',
				savings: '#udc-famille-ancre > ul > li.famille1 > strong',
				termsSavings: '#udc-famille-ancre > ul > li.famille2 > strong',
				bankSecurities: '#udc-famille-ancre > ul > li.famille3 > strong',
				lifeInsurances:  '#udc-famille-ancre > ul > li.famille4 > strong',
			},
			detailed: {
				default: {
					details: {
						accountName: 'div.compte-favori > div.infos-compte > h4',
						accountNumber: 'div.compte-favori > div.infos-compte',
						balance: {
							actual: 'div.compte-favori > div.infos-solde > h4',
							toCome: 'div.compte-favori > div.infos-solde > p.info > span.op-negatif.a-venir > strong'
						}
					}
				},
				checkingAccounts: {
					target: '#template-udc-vue-liste > section > ul.list-vue1.udc-liquidite > li[data-key]',
				}, 
				savingAccounts: {
					target: '#template-udc-vue-liste > section > ul.list-vue1.udc-epargne-dispo > li[data-key]',
				},
				termsSavingsAccounts: {
					target: '#template-udc-vue-liste > section > ul.list-vue1.udc-epargne-a-terme > li[data-key]',
				},
				bankSecuritiesAccounts: {
					target: '#template-udc-vue-liste > section > ul.list-vue1.udc-titre > li[data-key]',
				},
				lifeInsurancesAccounts: {
					target: '#template-udc-vue-liste > section > ul.list-vue1.udc-assurance-vie > li[data-key]',
					details: {
						accountName: 'div.compte-favori > div.infos-compte > a > h4'
					}
				},
				creditAccounts: [
					{
						target:'#template-udc-vue-liste > section > ul.list-vue1.udc-credit-conso > li[data-key]'
					},
					{
						target:'#template-udc-vue-liste > section > ul.list-vue1.udc-credit-immo > li[data-key]'

					}
				],
			}
		}
	}

};