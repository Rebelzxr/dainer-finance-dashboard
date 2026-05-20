/* DAINER Finance tax tools: pure calculations + browser UI wiring. */
(function(root, factory){
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DainerTaxTools = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  const FALLBACK_RULES = {
    last_verified: '2026-05-20',
    resident_profile: 'Malaysia resident individual; source withholding calculator with manual override.',
    markets: [
      {id:'US',label:'United States ordinary dividends',label_zh:'美国普通股息',currency:'USD',withholding_rate:0.30,basis:'US-source dividends: conservative Malaysia-resident default is 30%.',caveat:'W-8BEN confirms foreign status but does not create a Malaysia-US treaty reduction.'},
      {id:'MY',label:'Malaysia listed dividends',label_zh:'马来西亚上市股息',currency:'MYR',withholding_rate:0,basis:'Malaysia listed dividends have no source withholding.',caveat:'Resident individual dividend income above RM100,000 is taxed at 2% from YA2025.',local_dividend_tax:{threshold:100000,rate:0.02,currency:'MYR'}},
      {id:'SG',label:'Singapore ordinary dividends',label_zh:'新加坡普通股息',currency:'SGD',withholding_rate:0,basis:'Ordinary company dividends generally have no Singapore withholding.',caveat:'S-REIT/trust distributions can differ.'},
      {id:'HK',label:'Hong Kong dividends',label_zh:'香港股息',currency:'HKD',withholding_rate:0,basis:'Hong Kong has no dividend withholding tax.',caveat:'PRC-source income through Hong Kong can differ.'},
      {id:'UK',label:'UK ordinary dividends',label_zh:'英国普通股息',currency:'GBP',withholding_rate:0,basis:'UK ordinary dividends are generally paid without UK withholding.',caveat:'UK REIT PIDs differ.'},
      {id:'UK_REIT',label:'UK REIT property income distribution',label_zh:'英国 REIT 房产收入分派',currency:'GBP',withholding_rate:0.20,basis:'UK REIT PID default assumption: 20% withholding.',caveat:'Treaty/account setup can change this.'},
      {id:'AU_FRANKED',label:'Australia franked dividends',label_zh:'澳洲已抵免股息',currency:'AUD',withholding_rate:0,basis:'Fully franked dividends are not subject to Australian dividend withholding.',caveat:'Only applies to franked component.'},
      {id:'AU_UNFRANKED',label:'Australia unfranked dividends',label_zh:'澳洲未抵免股息',currency:'AUD',withholding_rate:0.15,basis:'Malaysia treaty assumption for ordinary unfranked dividends: 15%.',caveat:'Broker treatment can differ.'},
      {id:'CA',label:'Canada dividends',label_zh:'加拿大股息',currency:'CAD',withholding_rate:0.15,basis:'Malaysia treaty assumption for ordinary Canadian dividends: 15%.',caveat:'No treaty paperwork can mean statutory 25%.'},
      {id:'CN',label:'China PRC-source dividends',label_zh:'中国内地来源股息',currency:'CNY',withholding_rate:0.10,basis:'PRC-source non-resident dividend withholding commonly runs at 10%.',caveat:'Share class and broker chain matter.'}
    ],
    fx:{live_endpoint:'https://api.frankfurter.app/latest?from=USD&to=MYR,SGD,HKD,GBP,AUD,CAD,CNY'}
  };

  const TEXT = {
    en: {
      netIncome:'Net dividend income',
      withholding:'Source withholding',
      localTax:'Malaysia dividend tax',
      netYield:'Net yield',
      noTax:'No tax reinvested',
      afterTax:'After tax reinvested',
      liveFx:'Live FX loaded',
      manualFx:'Manual FX / source currency',
      sourceCurrency:'Source currency',
      ruleSource:'Rule source',
      caveat:'Caveat'
    },
    zh: {
      netIncome:'税后股息收入',
      withholding:'来源地预扣税',
      localTax:'马来西亚股息税',
      netYield:'税后收益率',
      noTax:'无税再投资',
      afterTax:'税后再投资',
      liveFx:'实时汇率已载入',
      manualFx:'手动汇率 / 原币显示',
      sourceCurrency:'来源货币',
      ruleSource:'规则来源',
      caveat:'注意'
    }
  };

  function lang(){
    if (typeof document === 'undefined') return 'en';
    return document.documentElement.lang === 'zh-Hans' ? 'zh' : 'en';
  }

  function t(key){
    const l = lang();
    return (TEXT[l] && TEXT[l][key]) || TEXT.en[key] || key;
  }

  function marketById(rules, marketId){
    return (rules.markets || []).find((market) => market.id === marketId) || (rules.markets || [])[0];
  }

  function marketLabel(market){
    return lang() === 'zh' && market.label_zh ? market.label_zh : market.label;
  }

  function asNumber(value, fallback){
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function overrideRate(value, fallbackRate){
    if (value === '' || value === null || value === undefined) return fallbackRate;
    const parsed = asNumber(value, NaN);
    if (!Number.isFinite(parsed)) return fallbackRate;
    return Math.max(0, parsed) / 100;
  }

  function calculateDividendTax(input){
    const rules = input.rules || FALLBACK_RULES;
    const market = marketById(rules, input.marketId);
    const portfolioValue = Math.max(0, asNumber(input.portfolioValue, 0));
    const grossYield = Math.max(0, asNumber(input.grossYield, 0));
    const grossIncome = portfolioValue * grossYield / 100;
    const withholdingRate = overrideRate(input.overrideWithholdingRate, market.withholding_rate || 0);
    const withholdingTax = grossIncome * withholdingRate;
    let localDividendTax = 0;

    if (market.local_dividend_tax) {
      const threshold = market.local_dividend_tax.threshold || 0;
      localDividendTax = Math.max(0, grossIncome - threshold) * (market.local_dividend_tax.rate || 0);
    }

    const totalTax = withholdingTax + localDividendTax;
    const netIncome = Math.max(0, grossIncome - totalTax);
    const netYield = portfolioValue > 0 ? netIncome / portfolioValue * 100 : 0;
    const dragPct = grossIncome > 0 ? totalTax / grossIncome * 100 : 0;

    return {
      market,
      portfolioValue,
      grossYield,
      grossIncome,
      withholdingRate,
      withholdingTax,
      localDividendTax,
      totalTax,
      netIncome,
      netYield,
      dragPct
    };
  }

  function calculateTaxDragProjection(input){
    const years = Math.max(1, Math.min(50, parseInt(input.years || 20, 10)));
    let noTax = Math.max(0, asNumber(input.portfolioValue, 0));
    let withTax = noTax;
    const series = [{year:0, noTax, withTax, drag:0}];
    for (let year = 1; year <= years; year++) {
      noTax += noTax * Math.max(0, asNumber(input.grossYield, 0)) / 100;
      const afterTax = calculateDividendTax(Object.assign({}, input, {portfolioValue:withTax})).netIncome;
      withTax += afterTax;
      series.push({year, noTax, withTax, drag:noTax - withTax});
    }
    return series;
  }

  function formatMoney(value, currency){
    const safeValue = Number.isFinite(value) ? value : 0;
    const symbols = {USD:'$', MYR:'RM', SGD:'S$', HKD:'HK$', GBP:'£', AUD:'A$', CAD:'C$', CNY:'CN¥'};
    const prefix = symbols[currency] || `${currency || ''} `;
    if (Math.abs(safeValue) >= 1e6) return prefix + (safeValue / 1e6).toFixed(2) + 'M';
    if (Math.abs(safeValue) >= 1e3) return prefix + Math.round(safeValue / 1e3).toLocaleString() + 'K';
    return prefix + Math.round(safeValue).toLocaleString();
  }

  function calcFxRate(from, to, fxRates){
    if (from === to) return 1;
    if (!fxRates) return null;
    const usdTo = (currency) => currency === 'USD' ? 1 : fxRates[currency];
    const fromUsd = usdTo(from);
    const toUsd = usdTo(to);
    if (!fromUsd || !toUsd) return null;
    return toUsd / fromUsd;
  }

  async function loadRules(){
    if (typeof window === 'undefined' || typeof fetch === 'undefined') return FALLBACK_RULES;
    try {
      const inSubdir = /\/(picks|newsletter|mockup)\//.test(window.location.pathname);
      const response = await fetch((inSubdir ? '../' : '') + 'data/tax-rates.json', {cache:'no-store'});
      if (!response.ok) throw new Error(`tax data ${response.status}`);
      return await response.json();
    } catch (_) {
      return FALLBACK_RULES;
    }
  }

  async function loadFx(rules){
    if (typeof fetch === 'undefined') return null;
    const endpoint = rules.fx && rules.fx.live_endpoint;
    if (!endpoint) return null;
    try {
      const response = await fetch(endpoint, {cache:'no-store'});
      if (!response.ok) throw new Error(`fx ${response.status}`);
      const data = await response.json();
      return data.rates || null;
    } catch (_) {
      return null;
    }
  }

  function drawTaxChart(canvas, series, currency, fxRate){
    if (!canvas || !canvas.parentElement) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const height = Math.max(240, rect.height - 20);
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--oxide').trim() || '#E8732B';
    const bull = styles.getPropertyValue('--bull').trim() || '#7AD66A';
    const line = styles.getPropertyValue('--line').trim() || '#2B2C30';
    const inkFaint = styles.getPropertyValue('--ink-faint').trim() || '#777';

    const w = rect.width;
    const h = height;
    const pad = {l:56,r:18,t:18,b:30};
    const cw = Math.max(1, w - pad.l - pad.r);
    const ch = Math.max(1, h - pad.t - pad.b);
    const maxV = Math.max(...series.map((p) => p.noTax), 1);
    const years = Math.max(1, series[series.length - 1].year);

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = line;
    ctx.fillStyle = inkFaint;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + ch * (1 - i / 4);
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(pad.l + cw, y);
      ctx.stroke();
      ctx.fillText(formatMoney(maxV * i / 4 * fxRate, currency), pad.l - 8, y + 3);
    }

    function pathFor(key, color, dash){
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(dash || []);
      ctx.beginPath();
      series.forEach((point, index) => {
        const x = pad.l + cw * point.year / years;
        const y = pad.t + ch * (1 - point[key] / maxV);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    pathFor('noTax', bull, [5, 5]);
    pathFor('withTax', accent);

    ctx.textAlign = 'center';
    for (let year = 0; year <= years; year += Math.max(1, Math.floor(years / 5))) {
      const x = pad.l + cw * year / years;
      ctx.fillText('Y' + year, x, pad.t + ch + 18);
    }
  }

  function initTaxTool(){
    if (typeof document === 'undefined' || !document.getElementById('tax-tool')) return;

    const els = {
      market: document.getElementById('tax-market'),
      portfolio: document.getElementById('tax-portfolio'),
      yield: document.getElementById('tax-yield'),
      years: document.getElementById('tax-years'),
      override: document.getElementById('tax-override'),
      currency: document.getElementById('tax-currency'),
      fxRate: document.getElementById('tax-fx-rate'),
      fxStatus: document.getElementById('tax-fx-status'),
      netIncome: document.getElementById('tax-net-income'),
      withholding: document.getElementById('tax-withholding'),
      localTax: document.getElementById('tax-local-tax'),
      netYield: document.getElementById('tax-net-yield'),
      drag: document.getElementById('tax-drag'),
      notes: document.getElementById('tax-rule-notes'),
      compare: document.getElementById('tax-compare-body'),
      chart: document.getElementById('tax-chart')
    };

    let rules = FALLBACK_RULES;
    let fxRates = null;

    function populateMarkets(){
      const current = els.market.value || 'US';
      els.market.innerHTML = '';
      rules.markets.forEach((market) => {
        const opt = document.createElement('option');
        opt.value = market.id;
        opt.textContent = marketLabel(market);
        els.market.appendChild(opt);
      });
      els.market.value = rules.markets.some((market) => market.id === current) ? current : 'US';
    }

    function updateFxField(){
      const market = marketById(rules, els.market.value);
      const outputCurrency = els.currency.value;
      const liveRate = calcFxRate(market.currency, outputCurrency, fxRates);
      if (liveRate) {
        els.fxRate.value = liveRate.toFixed(4);
        els.fxStatus.textContent = t('liveFx');
      } else {
        els.fxRate.value = market.currency === outputCurrency ? '1.0000' : els.fxRate.value || '1.0000';
        els.fxStatus.textContent = t('manualFx');
      }
    }

    function render(){
      const market = marketById(rules, els.market.value);
      const fxRate = Math.max(0, asNumber(els.fxRate.value, 1));
      const result = calculateDividendTax({
        portfolioValue: els.portfolio.value,
        grossYield: els.yield.value,
        marketId: els.market.value,
        overrideWithholdingRate: els.override.value,
        rules
      });
      const outputCurrency = els.currency.value;

      els.netIncome.textContent = formatMoney(result.netIncome * fxRate, outputCurrency);
      els.withholding.textContent = formatMoney(result.withholdingTax * fxRate, outputCurrency);
      els.localTax.textContent = formatMoney(result.localDividendTax * fxRate, outputCurrency);
      els.netYield.textContent = result.netYield.toFixed(2) + '%';
      els.drag.textContent = result.dragPct.toFixed(1) + '%';

      const l = lang();
      const basis = l === 'zh'
        ? `${t('sourceCurrency')}: ${market.currency}. ${t('ruleSource')}: ${market.basis || ''}`
        : `${t('sourceCurrency')}: ${market.currency}. ${t('ruleSource')}: ${market.basis || ''}`;
      const caveat = `${t('caveat')}: ${market.caveat || ''}`;
      els.notes.innerHTML = `<p>${basis}</p><p>${caveat}</p>`;

      const projection = calculateTaxDragProjection({
        portfolioValue: els.portfolio.value,
        grossYield: els.yield.value,
        marketId: els.market.value,
        overrideWithholdingRate: els.override.value,
        years: els.years.value,
        rules
      });
      const last = projection[projection.length - 1];
      const dragEl = document.getElementById('tax-compound-drag');
      if (dragEl) dragEl.textContent = formatMoney((last.noTax - last.withTax) * fxRate, outputCurrency);
      drawTaxChart(els.chart, projection, outputCurrency, fxRate);

      els.compare.innerHTML = rules.markets.map((row) => {
        const rowResult = calculateDividendTax({
          portfolioValue: els.portfolio.value,
          grossYield: els.yield.value,
          marketId: row.id,
          rules
        });
        const liveRowFx = calcFxRate(row.currency, outputCurrency, fxRates);
        const rowFx = liveRowFx || (row.currency === outputCurrency ? 1 : null);
        const rowCurrency = rowFx ? outputCurrency : row.currency;
        return `<tr>
          <td>${marketLabel(row)}</td>
          <td>${(row.withholding_rate * 100).toFixed(row.withholding_rate ? 1 : 0)}%</td>
          <td>${formatMoney(rowResult.netIncome * (rowFx || 1), rowCurrency)}</td>
          <td>${rowResult.netYield.toFixed(2)}%</td>
        </tr>`;
      }).join('');
    }

    ['change','input'].forEach((eventName) => {
      [els.market, els.portfolio, els.yield, els.years, els.override, els.currency, els.fxRate].forEach((el) => {
        el.addEventListener(eventName, () => {
          if (el === els.market || el === els.currency) updateFxField();
          render();
        });
      });
    });

    document.addEventListener('dainer:languagechange', () => {
      populateMarkets();
      render();
    });
    window.addEventListener('resize', render);

    loadRules().then((loadedRules) => {
      rules = loadedRules;
      populateMarkets();
      return loadFx(rules);
    }).then((loadedFx) => {
      fxRates = loadedFx;
      updateFxField();
      render();
    });
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initTaxTool);
  }

  return {
    FALLBACK_RULES,
    calculateDividendTax,
    calculateTaxDragProjection,
    formatMoney,
    calcFxRate
  };
});
