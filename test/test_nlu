var interactions = {
	"intents": [
		{
			"name": "Balance",
			"samples": [
				"(What is|What's) my ( |{Type}|bank) (|account) (cache balance|status|balance|total cash value|cash value)",
				"How much money do I have (|in my {Type})  (|account)",
				"(What is|What's) (the|my) (|bank) (balance|status|cache value|cache balance) (on|of) (|my) {Type} (|account)",
				"(What is|What's) my financial worth ( |on|of) ( |my|the) (|{Type}) (|account)",
				"(What is|What's) total amount left in (my|the) (account|bank|bank account)",
				"How much (|money) is in (my|the) (|{Type}) (bank|bank account|account)",
				"(What is|What's) the (|cash) status of my financial repository",
				"What status does (my|the) (|{Type}) account read",
				"(What is|What's) (my|the) (|{Type}|bank) account's credit (balance|status|cache value)",
				"(What is|What's) (my|the) ({Type} account|{Type}|account|bank account|financial) status",
				"How much cash do I possess",
				"(What is|What's) my financial possession",
				"What are the total funds available in (my|the) (|{Type}) ( |bank account|account)",
				"How much money does my financial repository reflect",
				"(What is|What's) the total amount (my|the) (|{Type}) account reads",
				"How much money is (my|the) (|{Type}) account worth",
				"What is the total amount of money in my financial repository",
				"What is my financial strength",
				"How much are the funds present in (my|the) ({Type}|{Type} account|account|bank account|bank|financial repository)",
				"What is the (cache balance|amount|balanace|cache value|value|status) of money (my|the) (bank|account|bank account|{Type}|{Type} account) balance reflect",
				"How much money belongs to me"
			],
			"entities": [
				{
					"name": "Type",
					"type": "LIST_OF_TYPES"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
					return checkBalance(context, req, res);
					},
				"endSession": false,
				"code": function anonymous(context,req,res) {
					return checkBalance(context, req, res);
					}
			},
			"discovery": "What is my account balance"
		},
		{
			"name": "Transactions",
			"samples": [
				"What were the transactions (on {Date}|between {DateBegin} and {DateEnd}) (|on my {Type} account)",
				"What are (|my) (|{Type}) (|account) transactions (on {Date}|between {DateBegin} and {DateEnd})",
				"What were (the last {Number}|{Type} account) transactions (on {Date}|between {DateBegin} and {DateEnd})",
				"What are (|my) (|{Type}) (|account) latest transactions",
				"What (were|are) (the|my) latest transactions (from|by) {PayeeName} ( |on {Date}|between {DateBegin} and {DateEnd})",
				"What (were|are) (the|my) latest transactions on my {Type} account ( |on {Date}|between {DateBegin} and {DateEnd})",
				"What (were|are) (the|my) latest transactions under {Category}  ( |on {Date}|between {DateBegin} and {DateEnd})"
			],
			"entities": [
				{
					"name": "Type",
					"type": "LIST_OF_TYPES"
				},
				{
					"name": "Date",
					"type": "CON1.DATE"
				},
				{
					"name": "DateBegin",
					"type": "CON1.DATE"
				},
				{
					"name": "DateEnd",
					"type": "CON1.DATE"
				},
				{
					"name": "Number",
					"type": "CON1.NUMBER"
				},
				{
					"name": "PayeeName",
					"type": "CON1.Corporation"
				},
				{
					"name": "Category",
					"type": "CON1.List_Of_Categories"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
			return checkTransactions(context, req, res);
			},
				"endSession": false,
				"code": function anonymous(context,req,res) {
			return checkTransactions(context, req, res);
			}
			},
			"discovery": "What are my latest transactions"
		},
		{
			"name": "Insights",
			"samples": [
				"how much I spend",
				"what I spent during {Date} on my {Type} account",
				"what I spent during {Date} at {PayeeName}",
				"How much I spend at {PayeeName} {Date}",
				"How much I spend at {PayeeName} {Date}",
				"How much I spend on {Category} {Date}",
				"what I spent at {PayeeName} ( |on {Date}|between {DateBegin} and {DateEnd})",
				"what I spent on my {Type} account ( |on {Date}|between {DateBegin} and {DateEnd})",
				"what I spent on {Category}  ( |on {Date}|between {DateBegin} and {DateEnd})",
				"how much I spend at {PayeeName} ( |on {Date}|between {DateBegin} and {DateEnd})",
				"how much I spend on my {Type} account ( |on {Date}|between {DateBegin} and {DateEnd})",
				"how much I spend {Category}  ( |on {Date}|between {DateBegin} and {DateEnd})"
			],
			"entities": [
				{
					"name": "Type",
					"type": "LIST_OF_TYPES"
				},
				{
					"name": "Date",
					"type": "CON1.DATE"
				},
				{
					"name": "DateBegin",
					"type": "CON1.DATE"
				},
				{
					"name": "DateEnd",
					"type": "CON1.DATE"
				},
				{
					"name": "Number",
					"type": "CON1.NUMBER"
				},
				{
					"name": "PayeeName",
					"type": "CON1.Corporation"
				},
				{
					"name": "Category",
					"type": "CON1.List_Of_Categories"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return checkTransactions(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return checkTransactions(context, req, res);
}
			},
			"discovery": "Tell me how much I spend on Fast Food"
		},
		{
			"name": "Transfer",
			"samples": [
				"(transfer|move) (|{Amount}) (|dollars) (|from {FromType}) (|account) (|to {ToType}) (|account)"
			],
			"entities": [
				{
					"name": "FromType",
					"type": "LIST_OF_TYPES"
				},
				{
					"name": "ToType",
					"type": "LIST_OF_TYPES"
				},
				{
					"name": "Amount",
					"type": "CON1.NUMBER"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return Transfer(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return Transfer(context, req, res);
}
			},
			"disabled": true,
			"discovery": "transfer 500 dollars from Checking account to Credit card account"
		},
		{
			"name": "ExchangeRate",
			"samples": [
				"What is the exchange rate of {From} to {To}",
				"What is the exchange rate of {To}"
			],
			"entities": [
				{
					"name": "From",
					"type": "CON1.Currencies"
				},
				{
					"name": "To",
					"type": "CON1.Currencies"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return ExchangeRate(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return ExchangeRate(context, req, res);
}
			},
			"discovery": "What is the exchange rate of Euro"
		},
		{
			"name": "ATMLocator",
			"samples": [
				"(where is|what is|what's) the (closest|nearest|nighest) (A.T.M.|ATM) ( |to) ( |{Street}|{Street} {City}) ( |{State})"
			],
			"entities": [
				{
					"name": "State",
					"type": "CON1.US_STATE"
				},
				{
					"name": "City",
					"type": "CON1.US_CITY"
				},
				{
					"name": "Street",
					"type": "CON1.PostalAddress"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return ATMLocator(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return ATMLocator(context, req, res);
}
			},
			"discovery": "where is the closest A.T.M."
		},
		{
			"name": "BranchLocator",
			"samples": [
				"(where is|what is|what's) the (closest|nearest|nighest) branch ( |to) ( |{Street}|{Street} {City}) ( |{State})"
			],
			"entities": [
				{
					"name": "State",
					"type": "CON1.US_STATE"
				},
				{
					"name": "City",
					"type": "CON1.US_CITY"
				},
				{
					"name": "Street",
					"type": "CON1.PostalAddress"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return ATMLocator(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return ATMLocator(context, req, res);
}
			},
			"discovery": "where is the closest branch"
		},
		{
			"name": "StockQuote",
			"samples": [
				"what is the quote for {Symbol}"
			],
			"entities": [
				{
					"name": "Symbol",
					"type": "CON1.Corporation"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return StockQuote(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return StockQuote(context, req, res);
}
			},
			"discovery": "what is the quote for Amazon.com"
		},
		{
			"name": "LoanRate",
			"entities": [
				{
					"name": "LoanType",
					"type": "LOAN_TYPES"
				}
			],
			"samples": [
				"what is the (Annual Percentage Rate|APR|rate) for (|a) (|{LoanType}) (|loan|credit)"
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
	) {
return LoanRate(context, req, res);
},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res
	) {
return LoanRate(context, req, res);
}
			},
			"disable": true,
			"disabled": true,
			"params": {
				"phone": ""
			},
			"discovery": "what is the Annual Percentage Rate for a loan"
		},
		{
			"name": "Howto",
			"entities": [
				{
					"name": "Item",
					"type": "HOW_TO_ITEMS"
				}
			],
			"samples": [
				"How do I {Item}"
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return Howto(context, req, res);
},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res
/*``*/) {
return Howto(context, req, res);
}
			},
			"disable": true,
			"disabled": true
		},
		{
			"name": "CallSupport",
			"entities": [],
			"samples": [
				"(|How) can I (contact|call|talk with|talk to) (support|someone)",
				"Can I get (help|assistant) on the phone",
				"What is the (support|member|service) (|phone) number"
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return CallSupport(context, req, res);
},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res
/*``*/) {
return CallSupport(context, req, res);
},
				"text": "You can call us at <say-as interpret-as=\"telephone\"></say-as><break time=\"1s\"/>and again, <say-as interpret-as=\"telephone\"></say-as>"
			},
			"disable": true,
			"params": {
				"phone": ""
			},
			"disabled": true,
			"discovery": "How can I contact support"
		},
		{
			"name": "EnterPINCode",
			"samples": [
				"{PINCode}",
				"my code is {PINCode}",
				"my pin code is {PINCode}",
				"the code is {PINCode}",
				"code is {PINCode}",
				"the pin code is {PINCode}"
			],
			"entities": [
				{
					"name": "PINCode",
					"type": "CON1.FOUR_DIGIT_NUMBER"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return EnterPINCode(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return EnterPINCode(context, req, res);
}
			}
		},
		{
			"name": "EnterAmount",
			"samples": [
				"{Amount}",
				"{Amount} dollars"
			],
			"entities": [
				{
					"name": "Amount",
					"type": "CON1.NUMBER"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return EnterAmount(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return EnterAmount(context, req, res);
}
			},
			"disabled": true
		},
		{
			"name": "EnterType",
			"samples": [
				"{Type}",
				"{Type} account"
			],
			"entities": [
				{
					"name": "Type",
					"type": "LIST_OF_TYPES"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return EnterType(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return EnterType(context, req, res);
}
			}
		},
		{
			"name": "EnterTypeFromTo",
			"samples": [
				"from {FromType} to {ToType}",
				"from {FromType} account to {ToType} account",
				"from {FromType} account to {ToType}",
				"from {FromType}  to {ToType} account"
			],
			"entities": [
				{
					"name": "FromType",
					"type": "LIST_OF_TYPES"
				},
				{
					"name": "ToType",
					"type": "LIST_OF_TYPES"
				}
			],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return EnterTypeFromTo(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res) {
return EnterTypeFromTo(context, req, res);
}
			},
			"disabled": true
		},
		{
			"name": "CON1.Launch",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return launch(context, req, res);

},
				"endSession": false,
				"reprompt": "For example, you can say, my pincode is 1 2 3 4.",
				"code": function anonymous(context,req,res) {
return launch(context, req, res);

}
			}
		},
		{
			"name": "CON1.CancelIntent",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onCancel(context, req, res);

},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onCancel(context, req, res);

}
			}
		},
		{
			"name": "CON1.StopIntent",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onCancel(context, req, res);

},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onCancel(context, req, res);

}
			}
		},
		{
			"name": "CON1.HelpIntent",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res) {
return onHelp(context, req, res);

},
				"endSession": false,
				"reprompt": "",
				"code": function anonymous(context,req,res) {
return onHelp(context, req, res);

}
			}
		},
		{
			"name": "CON1.SessionEnded",
			"samples": [],
			"response": {
				"type": "text",
				"data": "Thank you. <say-as interpret-as=\"interjection\">bon voyage</say-as>",
				"endSession": true,
				"text": "Thank you. <say-as interpret-as=\"interjection\">bon voyage</say-as>"
			}
		},
		{
			"name": "CON1.YesIntent",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onYes(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onYes(context, req, res);
}
			}
		},
		{
			"name": "CON1.NoIntent",
			"samples": [],
			"response": {
				"type": "code",
				"data": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onNo(context, req, res);
},
				"endSession": false,
				"code": function anonymous(context,req,res
/*``*/) {
return sdk.conversationHelper.onNo(context, req, res);
}
			}
		}
	],
	"entities": [
		{
			"name": "LIST_OF_TYPES",
			"values": [
				"Checking",
				"Savings",
				"Credit card",
				"Loan",
				"Mortgage",
				"Brokerage",
				"Current",
				"Personal"
			]
		},
		{
			"name": "HOW_TO_ITEMS",
			"values": [
				"change my username"
			]
		},
		{
			"name": "LOAN_TYPES",
			"values": [
				"Safetyline of Credit",
				"1 Year Personal Loan",
				"2 Years Personal Loan",
				"3 Years Personal Loan",
				"4 Years Personal Loan",
				"5 Years Personal Loan",
				"12 Months Personal Loan",
				"24 Months Personal Loan",
				"36 Months Personal Loan",
				"48 Months Personal Loan",
				"60 Months Personal Loan",
				"Personal Loan",
				"Credit Card",
				"Advantage Credit Card",
				"Signature Elite Credit Card"
			]
		}
	]
};

exports.interactions = interactions;
