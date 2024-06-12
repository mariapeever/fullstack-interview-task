const { describe, test, expect } = require("@jest/globals")
const request = require("request")
const { processHoldingsData } = require("./middleware")

const companies = require("./test-data/companies")
const investments = require("./test-data/investments")

// Jest tests
describe("CSV export", () => {
	test("process CSV data", () => {
		const csvObj = processHoldingsData(companies, investments)
		expect(csvObj.csv)
			.toStrictEqual('|User|First Name|Last Name|Date|Holding|Value|\n' +
					       '|1|Billy|Bob|2020-01-01|The Small Investment Company|1400|\n' +
					       '|2|Sheila|Aussie|2020-01-01|The Big Investment Company|10000|\n' +
					       '|2|Sheila|Aussie|2020-01-01|The Small Investment Company|10000|');
	
	})
})
