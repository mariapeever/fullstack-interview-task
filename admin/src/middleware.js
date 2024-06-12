const config = require("config")
const R = require("ramda")

exports.processHoldingsData = (companies, investments) => {
    const holdings = Object.fromEntries(companies.map(e => [e.id, e.name]))
    return ({
      csv: `|User|First Name|Last Name|Date|Holding|Value|\n` +
           `${investments
              .map(e => e.holdings
                .map(h => `|${e.userId}|${e.firstName}|${e.lastName}|${e.date}|` +
                          `${holdings[h.id]}|${R.multiply(e.investmentTotal)(h.investmentPercentage)}|`))
                .flat(1)
                .join('\n')}`
    })
}

    