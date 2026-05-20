const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const taxDataPath = path.join(root, 'data', 'tax-rates.json');
const taxToolsPath = path.join(root, 'assets', 'tax-tools.js');

const rules = JSON.parse(fs.readFileSync(taxDataPath, 'utf8'));
const tools = require(taxToolsPath);

function close(actual, expected, tolerance = 0.01) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`
  );
}

const markets = rules.markets.map((market) => market.id);
['US', 'MY', 'SG', 'HK', 'UK', 'AU_FRANKED', 'AU_UNFRANKED', 'CA', 'CN'].forEach((id) => {
  assert.ok(markets.includes(id), `missing market ${id}`);
});

assert.strictEqual(rules.markets.find((market) => market.id === 'US').withholding_rate, 0.30);
assert.strictEqual(rules.markets.find((market) => market.id === 'SG').withholding_rate, 0);
assert.strictEqual(rules.markets.find((market) => market.id === 'MY').local_dividend_tax.rate, 0.02);

const usCase = tools.calculateDividendTax({
  portfolioValue: 100000,
  grossYield: 4,
  marketId: 'US',
  rules,
});
close(usCase.grossIncome, 4000);
close(usCase.withholdingTax, 1200);
close(usCase.netIncome, 2800);
close(usCase.netYield, 2.8);

const myCase = tools.calculateDividendTax({
  portfolioValue: 3000000,
  grossYield: 5,
  marketId: 'MY',
  rules,
});
close(myCase.grossIncome, 150000);
close(myCase.withholdingTax, 0);
close(myCase.localDividendTax, 1000);
close(myCase.netIncome, 149000);

const drag = tools.calculateTaxDragProjection({
  portfolioValue: 100000,
  grossYield: 4,
  marketId: 'US',
  years: 20,
  rules,
});
assert.strictEqual(drag.length, 21);
assert.ok(drag[20].withTax < drag[20].noTax, 'taxed reinvestment should trail no-tax reinvestment');

console.log('tax-tools tests passed');
