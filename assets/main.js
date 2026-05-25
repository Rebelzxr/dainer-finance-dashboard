/* DAINER FINANCE — Mars Rover Log shared JS
   Theme toggle · scroll reveals · counters · SOL counter · runtime · cursor coord
*/

// Theme toggle
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try{ localStorage.setItem('dainer-finance-theme', next); }catch(_){}
}
(function loadTheme(){
  try{
    const saved = localStorage.getItem('dainer-finance-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }catch(_){}
})();

const I18N = {
  zh: {
    // Nav
    Dashboard:'总览',
    'Daily Brief':'每日简报',
    'US Picks':'美国精选',
    Malaysia:'马来西亚',
    Dividends:'股息',
    Traders:'投资人',
    Calculator:'计算器',
    Newsletter:'周报',
    UPLINK:'在线',
    LIVE:'实时',
    'DRK / LGT':'深 / 浅',

    // Calculator presets + labels
    'Conservative · 6%':'保守 · 6%',
    'Balanced · 8%':'平衡 · 8%',
    'Aggressive · 12%':'进取 · 12%',
    Currency:'货币',
    'Starting amount':'起始金额',
    'Monthly contribution':'每月投入',
    'Annual return':'年回报',
    'Time horizon':'投资年期',
    'Final portfolio value':'最终组合价值',
    'You contributed':'本金投入',
    'Compound gain':'复利收益',
    '% of value from compounding':'复利贡献占比',
    'Cash contributed':'投入本金',
    'Portfolio value':'组合价值',

    // Tax tool — existing keys
    taxSectionLabel:'02 · 股息税 + 实时汇率',
    taxSectionTitle:'国家税务<em>损耗</em>',
    taxSectionSub:'给马来西亚投资者比较美国、马来西亚、新加坡、香港、英国、澳洲、加拿大和中国股息收入。默认税率有来源支持，也可以按券商实际预扣税手动覆盖。',
    sourceMarket:'来源市场',
    officialDefault:'官方默认',
    portfolioValue:'组合金额',
    grossDividendYield:'股息率 %',
    projectionYears:'预测年数',
    overrideRate:'覆盖预扣税 %',
    optional:'可选',
    outputCurrency:'输出货币',
    fxRate:'汇率',
    taxDisclaimer:'不使用付费 API。汇率会尝试免费无密钥接口；如果被拦截，汇率栏可以手动填。税率是默认参考，不是个人税务建议。以券商结单为准。',
    netIncome:'税后收入',
    sourceWithholding:'来源地预扣税',
    malaysiaTax:'马来西亚股息税',
    netYield:'税后收益率',
    annualDrag:'年度税务损耗',
    noTaxReinvested:'无税再投资',
    afterTaxReinvested:'税后再投资',
    compoundDrag:'复利损耗',
    market:'市场',
    withholdingRate:'预扣税率',

    // Hero panel — labels
    '// CORE READOUT':'// 核心读数',
    'SINGLE LARGEST CONVICTION':'最大单一立场',
    REPORTS:'研究',
    POSITIONS:'持仓',
    TRADERS:'投资人',
    CADENCE:'节奏',
    HORIZON:'期限',
    'NEXT SYNC':'下次同步',
    SINGLES:'单只标的',
    ETFS:'指数基金',
    'TOP 5':'前五大',
    USD:'美元',
    UNIVERSE:'股票池',
    FINAL:'终选',

    // Hero panel — values
    '5 active':'5 份',
    '30+ tracked':'30+ 只',
    '26 watched':'26 位',
    'Sunday weekly':'每周日',
    'Daily + Sunday':'每日 + 周日',
    '3-5 yrs':'3-5 年',
    '+7 days':'+7 天',
    '10 total':'共 10 只',
    '8 names':'8 只标的',
    '2 (ITA + SMH)':'2 只 (ITA + SMH)',
    '57% of book':'占组合 57%',
    only:'仅限',
    '120 names':'120 只',
    '10 positions':'10 个仓位',

    // Hero kickers / labels (sec-tag + hero-tag)
    '⊕ DAINER FINANCE · MISSION LOG · v0.2':'⊕ DAINER FINANCE · 任务日志 · v0.2',
    '⊕ DAILY BRIEF · VERIFIED MARKET READ':'⊕ 每日简报 · 已验证市场读数',
    '⊕ REPORT 002 · v2 · US SWING 3-5YR':'⊕ 研究 002 · v2 · 美股 3-5 年波段',
    '// DEPLOY LOG · DASHBOARD':'// 部署日志 · 总览',
    '// DAILY UPLINK · MARKET INTEL':'// 每日连接 · 市场情报',
    '// PROBE 002 · PRIMARY HOLDINGS':'// 探针 002 · 主要持仓',
    '// PROBE 00 · DAILY BRIEF':'// 探针 00 · 每日简报',
    '// PROBE 01 · TODAY’S SUMMARY':'// 探针 01 · 今日摘要',
    "// PROBE 01 · TODAY'S SUMMARY":'// 探针 01 · 今日摘要',
    '// PROBE 02 · WARNINGS':'// 探针 02 · 风险提醒',
    '// PROBE 03 · EVENTS':'// 探针 03 · 事件',
    '// PROBE 04 · PORTFOLIO IMPACT':'// 探针 04 · 组合影响',
    '// PROBE 05 · VALUATION':'// 探针 05 · 估值',
    '// PROBE 06 · SOURCES':'// 探针 06 · 来源',
    '// PROBE 01 · THE REPORTS':'// 探针 01 · 研究目录',
    '// PROBE 02 · THIS WEEK’S READ':'// 探针 02 · 本周一读',
    "// PROBE 02 · THIS WEEK'S READ":'// 探针 02 · 本周一读',
    '// PROBE 03 · SIGNAL FEED':'// 探针 03 · 信号源',
    '// PROBE 01 · THE 5 THEMES':'// 探针 01 · 五个主题',
    '// PROBE 02 · THE 10 POSITIONS':'// 探针 02 · 10 个仓位',
    '// PROBE 03 · WHAT KILLS THE BASKET':'// 探针 03 · 风险清单',
    '// PROBE 04 · EXECUTION':'// 探针 04 · 执行',
    '// ASIDE · THE AI IPO QUESTION':'// 备注 · AI IPO 议题',
    '// LOG_CLOSE · DESIGN NOTES':'// 收尾日志 · 设计说明',

    // Section tag tails
    '5 ACTIVE · STATUS GREEN':'5 份活跃 · 状态正常',
    'WARNING-ONLY TELEGRAM':'仅重要风险发 Telegram',
    'BIG NEWS ONLY':'只看重大新闻',
    'NEXT CATALYSTS':'下一个催化',
    'THESIS CHANGE LOG':'论点变化日志',
    'FAST CHECK':'快速检查',
    'VERIFY FIRST':'先验证',
    'ISSUE 001 · 2026.05.20':'第 001 期 · 2026.05.20',
    'WIRE · WEEKLY':'电讯 · 每周',
    'DECADE-LONG SHIFTS':'十年级位移',
    '8 SINGLES · 2 ETFS · STATUS GREEN':'8 单一 · 2 指数 · 状态正常',
    'ANTHROPIC · 2026.05.20':'Anthropic · 2026.05.20',
    'HONEST · 6 RISKS':'直白 · 6 项风险',
    'HOW TO LEG IN · ALPHA TAX':'建仓方式 · 阿尔法税',

    // Waypoint labels
    'Active reports':'活跃研究',
    'Positions tracked':'跟踪持仓',
    'Top single conviction':'最大单一立场',
    'Newsletter cadence':'周报节奏',
    'AI agents per report':'每份研究 AI 代理数',
    'Universe screened':'股票池筛选',
    'Phase 1 candidates':'一阶段候选',
    'Final positions':'终选仓位',
    'Top 5 concentration':'前五大占比',
    'Largest position':'最大单仓',

    // Waypoint subs
    '// across all sleeves':'// 覆盖所有篮子',
    '// 14% · foundry monopoly':'// 14% · 晶圆代工垄断',
    '// weekly · auto-drafted':'// 每周 · 自动生成',
    '// parallel research per theme':'// 每主题并行研究',
    '// US · MY · Dividends · Traders · Leopold':'// 美 · 马 · 股息 · 投资人 · Leopold',
    '// 5 parallel agents · 5 themes':'// 5 个并行代理 · 5 主题',
    '// passed quality + valuation gates':'// 通过质量 + 估值筛选',
    '// 8 singles + 2 ETFs':'// 8 单 + 2 指数',
    '// conviction-weighted':'// 按信念权重',

    // Risk card headlines
    'Taiwan kinetic event':'台海局势冲突',
    'Hyperscaler AI capex pause':'超大规模云资本开支放缓',
    'GLP-1 supply normalizes':'GLP-1 供应正常化',
    'Peace dividend':'和平红利',
    'Power buildout regulatory block':'电网建设监管阻碍',
    'Rate spike':'利率飙升',

    // Exec card titles
    'Leg-in plan':'建仓计划',
    '50 / 25 / 25 across 6 weeks':'50 / 25 / 25 · 分 6 周',
    'Rebalance triggers':'再平衡触发条件',
    'Quarterly check, annual reset':'每季复核 · 年度重置',
    'Instant exit signals':'即时退出信号',
    'What forces a hard cut':'触发硬清仓条件',
    'What this is NOT':'本组合不是什么',
    'Honest disclaimers':'诚实免责声明',
    "What's confirmed":'已确认信息',
    'No S-1 filed. No date. No ticker.':'未提交 S-1 · 无日期 · 无代码',
    "What's rumored":'坊间传闻',
    'S-1 in July · IPO in Q4 2026':'7 月递 S-1 · 2026 Q4 IPO',
    'Pre-IPO exposure routes':'IPO 前敞口路径',
    'Three ways now':'当前三种方式',
    "What I'd actually do":'我会怎么做',
    'Wait for the S-1':'等 S-1 出来',

    // Footer h4
    About:'关于',
    'Automation contract':'自动化合约',
    'Site map':'站点地图',
    Connect:'联系',
    'Source files':'原始文件',
    'Companion reports':'配套研究',
    'External sources':'外部来源',
    Methodology:'方法论',
    'Methodology · v2':'方法论 · v2',
    'Methodology · 13F tracker':'方法论 · 13F 追踪器',

    // News meta
    '● TRACKED':'● 已跟踪',
    'VIEW SOURCE':'查看原文',

    // Nav card meta
    '10 picks · 5 themes · STATUS verified':'10 标的 · 5 主题 · 状态已验证',
    '11 picks · 5 themes · Bursa Malaysia':'11 标的 · 5 主题 · 马交所',
    '21 picks · 3 sleeves · 4.5% blended yield':'21 标的 · 3 篮子 · 4.5% 混合收益率',
    '26 tracked · 22 verified · STATUS green':'26 跟踪 · 22 已验证 · 状态正常',
    'Tactical · 1-2Q horizon · long/short':'战术 · 1-2 季度 · 多空',
    'Interactive · client-side · USD + MYR':'互动 · 客户端 · 美元 + 马币',

    // Footer copy fragments
    'v0.2 · launched 2026-05-20':'v0.2 · 2026-05-20 上线',

    // Status tag
    'STATUS: VERIFIED · 5 theme files · 4 of 5 SEC-sourced':'状态：已验证 · 5 个主题文件 · 4 个 SEC 来源',

    // Daily brief structural labels
    '// DAILY READOUT':'// 每日读数',
    'HIGHEST ALERT':'最高提醒',
    SESSION:'交易段',
    UPDATED:'更新时间',
    SOURCES:'来源',
    TELEGRAM:'Telegram',
    'Daily brief':'每日简报',
    'Warning rules':'提醒规则',
    'When Telegram fires':'什么时候发 Telegram',
    'MARKET MODE':'市场状态',
    BREADTH:'广度',
    'PORTFOLIO IMPACT':'组合影响',
    TRACKED:'已跟踪',

    // Codex i18n coverage expansion
    "dashboardHeroTitle":"<span class=\"lbl\">// 部署日志 · 总览</span>一个建造者的<br><em>金融</em>与<br>资本<em>视角</em>。",
    "dashboardHeroSub":"这里放我的<em>标的</em>、<em>每周阅读</em>和数学计算，为未来 5 年复利做开放笔记。5 份研究、26 位投资人跟踪、一本公开笔记。<em>免费，无付费墙，不是建议。</em>",
    "dashboardReportsTitle":"三个视角，<br><em>一本账本</em>。",
    "dashboardDailyTitle":"每日<em>读数</em>，<br>不制造噪音。",
    "dailyHeroTitle":"<span class=\"lbl\">// 每日连接 · 市场情报</span>一页看清<br>每天的<em>信号</em>。",
    "dailySummaryTitle":"隔夜<br><em>改变了什么</em>。",
    "dailyAlertsTitle":"真正需要<br><em>注意</em>的提醒。",
    "dailyCalendarTitle":"日历与<br><em>关键日期</em>。",
    "dailyPortfolioTitle":"账本里的<br><em>变化</em>。",
    "dailyValuationTitle":"估值<br><em>观察</em>。",
    "dailySourceTitle":"来源<br><em>账本</em>。",
    "dailyAutomationContract":"每日任务会研究、验证、写入 <span id=\"contract-json\">data/daily-brief.json</span>，把完整本地报告存进 DAINER OS，提交并推送金融网站；只有风险提醒或重大新闻才发 Telegram。",
    "dashboardLatestTitle":"最新<em>一期</em>。",
    "dashboardNewsTitle":"真正<em>改变 thesis</em>的新闻。",
    "navUsTitle":"美国波段 <em>3-5 年</em>",
    "navUsSub":"10 个美国仓位，覆盖算力、医疗、电气化、质量股和国防。8 只单股 + 2 只 ETF (ITA, SMH)。最大单一立场：TSM 14%。",
    "navMyTitle":"马来西亚 <em>3-5 年波段</em>",
    "navMySub":"以令吉计价的 5 主题清单：柔佛数据中心、马来西亚银行、医疗、电气化 (TNB) 和回流建设。偏股息友好。",
    "navDivTitle":"股息<em>收入</em>",
    "navDivSub":"3 个收入篮子：美国股息贵族、美国高股息专项、马来西亚令吉收入。已包含马来西亚持有人的税务逻辑。",
    "navTradersTitle":"知名<em>投资人</em>",
    "navTradersSub":"26 位传奇投资人。Buffett、Burry、Wood、Druckenmiller、Icahn、Pelosi、Thiel 等。13F 文件 + 国会议员 PTR。每周更新。",
    "navLeopoldTitle":"Leopold <em>13F 追踪</em>",
    "navLeopoldSub":"Situational Awareness LP 的季度读数。战术性 1-2 季度视角，和 3-5 年组合不是同一种东西。每个 13F 截止日更新。",
    "navCalcTitle":"复利<em>计算器</em>",
    "navCalcSub":"输入起始金额、每月投入、预期回报和投资年期。再按来源国家比较股息税务损耗，可手动覆盖券商税率。",
    "dashboardIssueHeadline":"上线：三份研究、一个仪表盘，还有 Leopold 的反手球",
    "dashboardIssueWhatNew":"<em>新增内容：</em>把 dainer-fund 波段仪表盘和新的 3-5 年研究合并成一个 Mars-rover 风格网站。旧版直接丢掉。",
    "dashboardIssueChangedMind":"<em>我改变看法的地方：</em>18 个标的 (v1) 太像隐形指数化。v2 切到 10 个，加 2 只 ETF (ITA 国防、SMH 半导体)，保留广度但减少选股税。",
    "dashboardIssueLeopold":"<em>Leopold 的反手球：</em>他的 Q1 13F 变成长短仓杠铃。$8.5B 看跌期权压在大型算力股上。他 2024 年写的 thesis，现在已经变成共识。",
    "dashboardIssueAnthropic":"<em>Anthropic IPO：</em>不是 7 月。7 月只是传闻中的 S-1 提交窗口。真正上市目标是 2026 Q4。",
    "readFullIssue":"阅读全文 →",
    "dashboardSubscribeCopy":"每周一封。标的、我改变看法的地方、一个值得点击的图表。无垃圾邮件，无追加销售。两次点击即可退订。",
    "dashboardFeedFallback":"新闻源加载中。每周日随周报更新。",
    "usHeroTitle":"<span class=\"lbl\">// 探针 002 · 主要持仓</span>10 个<em>标的</em>，<br>5 个主题，<br>只用<em>美元</em>。",
    "usHeroSub":"8 只单股加 2 只 ETF（<em>ITA</em> 国防 + <em>SMH</em> 半导体），让执行保持简单，同时覆盖算力、医疗、电气化、国防和那些没人发推的复利型企业。最大单一立场：<em>TSM 14%</em>。前五大占组合 57%。",
    "usThemesTitle":"10 年维度里，alpha <em>藏在哪里</em>。",
    "usPicksTitle":"点击任一标的，<em>打开 thesis</em>。",
    "usAnthropicTitle":"Anthropic IPO — <em>不是 7 月</em>。",
    "usRisksTitle":"会让 thesis<br><em>失效</em>的事。",
    "usExecutionTitle":"执行<em>就是</em><br>alpha 税。",
    "usThemeAiName":"AI 基建 <em>卖铲人</em>",
    "usThemeAiMeta":"站在 GPU 后面，不是站在 GPU 上。晶圆代工垄断 (TSM) + 网络护城河 (ANET) + 半导体 ETF (SMH)，用来拿广度。",
    "usThemeHealthcareName":"医疗<em>创新</em>",
    "usThemeHealthcareMeta":"GLP-1 取代肿瘤成为主线。LLY 拿到结构性赢家位置。VRTX 是盈利且净现金的 3 平台非对称 biotech。",
    "usThemeQualityName":"质量型<em>复利标的</em>",
    "usThemeQualityMeta":"无聊但有尾部。MSFT 给 AI 超大型公司韧性，V 给全球支付通行税。轻资产、定价权、30%+ ROIC。",
    "usThemeEnergyName":"能源 <em>+ 电气化</em>",
    "usThemeEnergyMeta":"美国电力需求结束 15 年平线开始拐头。核电复兴 (CEG) + 电网建设 (ETN)。",
    "usThemeDefenseName":"国防 <em>+ 航空航天</em>",
    "usThemeDefenseMeta":"地缘政治的十年。单一 ETF (ITA) 打包 6 大主承包商：LMT · RTX · NOC · GD · HII · BA。仓位最小。",
    "usRiskTaiwanBody":"TSM、SMH 里的 ASML、SMH 里的 AVGO、ANET、VRT —— 每个 AI 基建名字都在 TSMC 硅片下游。这个风险无法分散，只能在持有 thesis 时接受。",
    "usRiskCapexBody":"任何一个季度，如果 MSFT/META/AMZN/GOOGL 同步下调指引，AI 基建组合会一起被砸。重点看它们 7 月和 10 月的业绩周期。",
    "usRiskGlpBody":"如果 NVO 口服药 + AMGN MariTide 比市场预期更快上市，LLY 定价权会被压缩。2026 年 10 月 CV 结局试验是关键变量。",
    "usRiskPeaceBody":"如果乌克兰停火 + 中东降温，ITA 主承包商会失去紧迫性溢价。所以只给 10% 仓位，并通过 ETF 分散到主承包商。",
    "usRiskPowerBody":"FERC 或州 PUCs（VA、TX、OH）如果限制数据中心接入电网，CEG / ETN 会硬性重估。盯住 2026 年 Virginia 州议会。",
    "usRiskRateBody":"长端利率上行 100bp+ 会压缩每个质量复利股的估值倍数。MSFT、V、ANET、VRTX 能以 22-37× 交易，是因为折现率仍温和。",
    "myHeroTitle":"马来西亚<br><em>令吉</em> <span class=\"amp\">×</span> 锚点。",
    "myHeroSub":"这本账的<em>令吉计价</em>一半。柔佛数据中心超级周期、东盟银行、医院网络、电气化收费路 —— 对马来西亚持有人来说，没有外汇风险。",
    "myThesisTitle":"令吉 alpha <em>真正在哪里</em>。",
    "myThesisSub":"从美国 5 主题框架改编。国防换成建设/回流，因为马股没有纯国防标的。AI 基建层由柔佛数据中心建设主导。",
    "myPicksTitle":"点击任一标的，<em>打开 thesis</em>。",
    "myPicksSub":"显示 Bursa 代码。Maybank 是最大单一立场（如果切到 5 只，给 25%）。前五大集中组合：MAYBANK 25 · IHH 20 · TENAGA 20 · GAMUDA 20 · NATGATE 15。",
    "myDcTitle":"数据中心<em>超级周期</em>。",
    "myDcSub":"4 种打法。1 个 thesis。到 2030 年已宣布超过 5GW。",
    "myRisksTitle":"什么会杀死<em>令吉组合</em>。",
    "myThemeAiName":"AI 基建 <em>+ 数据中心</em>",
    "myThemeAiMeta":"柔佛是东南亚数据中心枢纽。TENAGA 收电网通行费，YTLPOWR 自有自营，NATGATE 是东南亚唯一 NVIDIA OEM 伙伴。",
    "myThemeFinancialsName":"质量型<em>金融股</em>",
    "myThemeFinancialsMeta":"5-6% 股息率加 11-13% ROE。马来西亚银行是组合的股息脊梁。Maybank = 东盟触达，PBBank = 最低 NPL，CIMB = 重估打法。",
    "myThemeHealthcareName":"医疗<em>规模</em>",
    "myThemeHealthcareMeta":"IHH 是亚洲唯一上市且有规模的医院网络。FY24 新增 1,000 张床位。Mount Elizabeth + Pantai + Gleneagles 品牌溢价。",
    "myThemeEnergyName":"能源 <em>+ 燃油零售</em>",
    "myThemeEnergyMeta":"PETDAG 以 18% ROE + 4.7% 股息率主导燃油零售。TENAGA 横跨主题 1（电网 + 数据中心）。两者都是受监管现金流，背后有资本开支管线。",
    "myThemeIndustrialName":"回流 <em>+ 工业</em>",
    "myThemeIndustrialMeta":"Gamuda RM37bn 订单储备，其中 45-50% 是数据中心土建。Sime Darby 通过 BMW MY + UMW 收购分散业务，估值 9x P/E。",
    "myRiskOprBody":"净息差压缩会同时打击 3 家银行（Maybank、PBBank、CIMB）。马来西亚银行 = 推荐前五大里的 50%。缓冲：TENAGA + PETDAG + Gamuda 对利率更中性。",
    "myRiskUtilityBody":"TENAGA 电价是政治变量。补贴或 IPP 电价上限可以一夜之间推翻受监管 ROE thesis。每年 10 月财政预算案都要盯公用事业 headline。",
    "myRiskDcBody":"如果超大规模云资本开支暂停（和美国 10 标的的风险相关），Tenaga + YTLPOWR + Gamuda + NationGate 会一起下跌。11 个名字中 4 个约 40% 配置相关。分散器：银行、IHH、PETDAG。",
    "myRiskTurkeyBody":"里拉不稳会打击 IHH 约 30% EBITDA。重估 thesis 取决于 Acibadem 在 2026 年逐步正常化。",
    "myRiskMyrBody":"反直觉：如果 MYR 对 USD 走强，出口商（NATGATE、VITROX）会受伤，因为收入/成本以美元计价。银行中性，医疗混合。",
    "myRiskLiquidityBody":"马股散户占比高。外资流出 + 散户恐慌，15-20% 回撤会很快发生。缓冲：按仓位控制，确保有 12 个月干火药能在回撤中积累。",
    "divHeroTitle":"股息<br><em>收入</em> <span class=\"amp\">×</span> 纪律。",
    "divHeroSub":"无聊的收入篮子。<em>3 个篮子</em>：美国股息贵族、美国高股息专项、马来西亚令吉收入，按税后看。目标不是追高息，而是能复利的耐久现金流。",
    "divSleevesTitle":"不同篮子，<em>不同工作</em>。",
    "divSleevesSub":"每个篮子都有自己的任务。不要在脑子里混成一个东西，它们为不同事情付钱，也会以不同方式失效。",
    "divTaxTitle":"给<em>马来西亚持有人</em>。",
    "divTaxSub":"MY 标的得到 20% 篮子的原因不是爱国，而是税后收益率数学。",
    "divPicksTitle":"点击任一标的，<em>打开 thesis</em>。",
    "divPicksSub":"按篮子颜色编码。A 绿色、B 金色、C 红色，对应上方主题卡颜色。底部有 ETF 懒人路径。",
    "divLazyTitle":"如果你<em>不想自己选股</em>。",
    "divLazySub":"3 只 ETF + 2 只马股单股。约 4-5% 混合税后股息率，零个股选择，最低决策疲劳。",
    "divRisksTitle":"股息篮子的<em>风险</em>。",
    "divSleeveAName":"美国<em>股息贵族</em>",
    "divSleeveAMeta":"25 年以上连续提高股息。质量护城河。派息率可持续。马来西亚居民扣除 30% 美国预扣税后的净收益率约 2.1-2.6%。",
    "divSleeveBName":"美国<em>高股息专项</em>",
    "divSleeveBMeta":"REITs、BDC、管道、通信。更高股息率 = 更高风险。覆盖率比 headline 股息率更重要。扣除 30% 美国预扣税后约 3.5-6.3%。",
    "divSleeveCName":"马来西亚<em>令吉收入</em>",
    "divSleeveCMeta":"Bursa Malaysia。来源地 0% 预扣税。马来西亚税务居民个人仍应模拟每年股息超过 RM100k 后的 2% 股息税。",
    "divRiskRateBody":"REITs (O, VNQ)、通信 (VZ)、公用事业 (ED, TENAGA) 在长端利率上行 100bp+ 时都会被重估下杀。合计约收入篮子 30%。缓冲：BDC (ARCC, MAIN) 是浮动利率，利率上行反而有正面贡献。",
    "divRiskTreatyBody":"美国股息一开始就按马来西亚居民 30% 预扣税假设。净股息率会低于多数股息筛选器显示。缓冲：每次买入都用税务计算器和 MY / SG / HK / UK 收入替代品比较。",
    "divRiskCutsBody":"高股息 B 篮子会最先砍股息。衰退时 ARCC + MAIN 信贷损失上升，ENB / KMI 有大宗商品敞口，VZ 有债务服务压力。缓冲：A 篮子名字有 25 年以上不砍股息纪录，连 GFC 都没有打破 JNJ、PG、KO。",
    "divRiskRinggitBody":"如果 MYR 对 USD 下跌 20%+（历史上发生过），C 篮子收入会失去美元购买力。但如果你住在马来西亚，MYR 资产以 MYR 计仍可接受。只有计划把 MY 收入换成 USD 时才痛。",
    "divRiskTrapBody":"刻意排除的例子：MMM（2024 年 4 月砍股息）、WBA（2024 年 1 月砍）、T（2022 年砍）、KHC（结构性见顶）、MO（终端资产 thesis）。高股息常常在提醒底层业务弱。每季盯派息率 + FCF 覆盖。",
    "divRiskOprBody":"如果 BNM 降 OPR 支撑增长，MAYBANK + PBBANK 净息差压缩，股息覆盖会收紧。两者派息率 73-80%，缓冲有限。C 篮子银行权重高（7 个名字里 3 个）。对冲：REITs (SUNREIT, PAVREIT) 会受益于降息。",
    "tradersHeroTitle":"聪明钱<br><em>到底</em>持有什么。",
    "tradersHeroSub":"26 位知名投资人。他们的<em>前五大仓位</em>、加了什么、卖了什么。来源是 SEC EDGAR 13F 文件 + CapitolTrades 披露。随周报每周更新。",
    "tradersUniverseTitle":"<em>投资人宇宙</em>。",
    "tradersUniverseSub":"按风格筛选。点击任一卡片查看前五大仓位、近期变化和 SEC 文件链接。Ticker 会在新标签页打开 TradingView。",
    "tradersSourcesTitle":"来源 <em>+ 节奏</em>。",
    "tradersMethodologyCopy":"Codex 每周日从 SEC EDGAR 拉取最新 13F 文件，并从 CapitolTrades 拉取国会议员 PTR。数据标准化到 <code>data/famous-traders.json</code>。仅展示，不是交易建议。任何配置决定前，都要用每张卡提供的真实 filing URL 核对。",
    "leopoldHeroTitle":"Leopold 的<br><em>13F</em> <span class=\"amp\">×</span> 战术读数。",
    "leopoldHeroSub":"和 3-5 年账本不是同一种东西。这是<em>1-2 季度视角</em>，看 Anthropic AGI-thesis 作者实际押注什么、又在对冲什么。到 2026 Q1，他的基金是长/短杠铃，不是只做多 AGI ETF。",
    "leopoldHeadlineTitle":"他切成了<em>杠铃</em>。",
    "leopoldHeadlineSub":"Q4 2025 零看跌期权。Q1 2026 八十亿美元名义看跌。写下“compute scaling continues”的人，现在正在主动对冲他自己 thesis 的共识版本。",
    "leopoldRulesTitle":"给我自己的账本 — <em>三条规则</em>。",
    "leopoldDeadlinesTitle":"下一份 <em>13F</em> 什么时候落地。",
    "leopoldRule1Copy":"散户无法有效复制 13F 看跌期权。行权价 + delta 选择是定制化的。用 SQQQ 或 SOXS 做散户对冲只是在流 theta。如果你想表达看空，就降低那些看跌名字的权重，不要主动做空。",
    "leopoldRule2Copy":"SanDisk 从他的 Q1 成本已经 +107%。非对称性不在了。不要因为它是他的第一大仓就追。看他什么时候进，不只看他持有什么。仍低于他平均成本的卖铲人：BE (+87%)、CRWV (+26%)、IREN (+39%)。",
    "leopoldRule3Copy":"13F 在你看到时已经旧了 45 天。他可能已经轮动。真正耐久的是 THESIS：他在传递一个信号，AI 组合里，从这里开始二阶衍生品比共识名字复利更快。这会影响 3-5 年账本，让我减少直接 NVDA 敞口（只通过 SMH 持有约 1.5%）。",
    "leopoldCompanionCopy":"完整 markdown 报告包含 SEC filing URL、accession numbers、LP + Partners LP master-feeder 两套持仓表，以及我基于这个 thesis 做的 5 标的激进短周期组合。",
    "leopoldLocalOnly":"完整研究 MARKDOWN 只在本地，不发布到 GitHub Pages",
    "leopoldMethodologyCopy":"13F 文件在季度结束后 45 天提交。只披露多头仓位；看跌期权只显示名义价值，看不到行权价/到期日。把它当方向读数，不是实际交易。每个 filing 截止日由 Codex 拉 SEC EDGAR XML，解析并综合到本页。",
    "calcHeroTitle":"复利，<br><em>穿越</em> <span class=\"amp\">×</span> 时间。",
    "calcHeroSub":"每个投资者都该内化的一张图。输入起始金额、每月投入、预期回报和投资年期。<em>数学不会说谎。</em>你的输入不会离开这个页面。",
    "calcInputsTitle":"输入 <em>×</em> 输出",
    "calcInputsNote":"年度复利 · 为了简化，每月投入按每年年底加入。输入只存在你的浏览器里，不传输、不记录。",
    "calcResultSub":"≈ <em><span id=\"multiple\">12</span>×</em> 你的本金 · <span id=\"cagr\">8%</span> CAGR",
    "calcLessonsTitle":"<em>三个教训</em>",
    "calcPrivacyCopy":"这个计算器完全在你的浏览器里运行。你的输入不会传到任何服务器，不存进任何 cookie，也不会被记录。刷新页面后，所有输入会回到默认值。本站没有会捕捉这些数值的 analytics。",
    "newsletterHeroTitle":"每周<br><em>一读</em>。",
    "newsletterHeroSub":"每周日一封。标的、我改变看法的地方、一个值得点击的图表。<em>无付费墙，无追加销售。</em>整个网站免费，这封也免费。",
    "newsletterSubscribeTitle":"进我的<em>收件箱</em>。",
    "newsletterSubscribeSub":"两次点击即可退订。RSS 可用于 fediverse / 阅读器应用。",
    "newsletterSundayTitle":"周日阅读",
    "newsletterSundayCopy":"市场周五收盘。我周末阅读。周日晚 8 点 AEST，你会收到这一期：标的回顾、新闻扫描、一个值得点击的想法。",
    "newsletterAltTitle":"如果你不用 email",
    "newsletterArchiveTitle":"<em>存档</em>",
    "newsletterArchiveSub":"所有过去期号都在这里。点击可在浏览器阅读，也可以使用 RSS feed。",
    "newsletterAboutCopy":"免费、每周、无付费墙。每周日一封，覆盖我正在看的标的、我改变看法的地方，以及 3-5 条会改变 thesis 的新闻。不是财务建议，只是开放笔记。草稿每周六由 Codex 自动生成（刷新价格 + 新闻扫描），再由我手动复核，周日发布。",
    "issueHeroMetaBack":"← 存档",
    "issueHeroTitle":"这次<em style=\"font-style:italic;color:var(--accent);\">上线</em>：三份研究、一个仪表盘，还有 Leopold 的反手球。",
    "issueHeroSub":"欢迎来到第一期。这周新增了什么、我改变了什么看法，以及一个值得点击的图表。",
    "issueSubscribeLiked":"喜欢这期？",
    "issueSubscribeTitle":"下一期直接进你的收件箱。",
    "14% allocation · 5y ROIC 35.1%Foundry monopoly · no second source":"14% 配置 · 5 年 ROIC 35.1%晶圆代工垄断 · 无第二来源",
    "Interactive · client-side · compound + tax":"互动 · 客户端 · 复利 + 税务",
    "Read full issue →":"阅读全文 →",
    "READ FULL ISSUE →":"阅读全文 →",
    "Subscribe to weekly":"订阅每周版",
    "RSS: /newsletter/feed.xml · GitHub: repo":"RSS：/newsletter/feed.xml · GitHub：repo",
    "DAINER Finance is one operator's open notebook on markets, picks, and capital. Built in public. Not financial advice — research artifacts only. Every pick is independently verifiable from cited sources.":"DAINER Finance 是一个操盘者关于市场、标的和资本的开放笔记。公开构建。不是财务建议，只是研究产物。每个标的都可从引用来源独立核验。",
    "Privacy":"隐私",
    "Companion pages":"配套页面",
    "Source":"来源",
    "Sources":"来源",
    "Client-side only · no tracking":"仅客户端 · 不追踪",
    "US 3-5yr picks (potential 10-15% CAGR)":"美国 3-5 年标的（潜在 10-15% CAGR）",
    "Dividend income (4-5% net yield base)":"股息收入（4-5% 税后收益率基础）",
    "Malaysia (MYR-denominated)":"马来西亚（MYR 计价）",
    "Weekly newsletter":"每周周报",
    "GitHub source":"GitHub 源码",
    "total cash in":"总现金投入",
    "growth from compounding":"复利带来的增长",
    "vs cash contributed":"相对投入现金",
    "Annual compounding · monthly contributions added at end of each year for simplicity. Inputs stored in your browser only — nothing transmitted, nothing logged.":"年度复利 · 为简化，每月投入按每年年底加入。输入只保存在你的浏览器里，不传输、不记录。",
    "Tool · interactive":"工具 · 互动",
    "Nothing saved, nothing shared":"不保存，不分享",
    "The single chart every investor needs to internalize. Punch in your starting amount, monthly add, expected return, and time horizon. The math doesn't lie. Your inputs never leave this page.":"每个投资者都该内化的一张图。输入起始金额、每月投入、预期回报和投资年期。数学不会说谎。你的输入不会离开这个页面。",
    "Inputs × outputs":"输入 × 输出",
    "Tool · interactiveAll inputs stay client-sideNothing saved, nothing shared":"工具 · 互动所有输入只留在客户端不保存，不分享",
    "Time horizon 25 years":"投资年期 25 年",
    "years":"年",
    "03 · What the numbers say":"03 · 数字说明了什么",
    "The extra decade: 50% more cash in for 150% more value. The last 10 years compound the first 20.":"<em>多出来的 10 年：</em>多投入 50% 现金，却得到 150% 更多价值。最后 10 年会复利前 20 年。",
    "Implication: start now beats start optimal.":"<em>含义：</em>现在开始，胜过等到最优才开始。",
    "4% extra return = 3× the value. Not 4% extra. Three times.":"<em>多 4% 回报 = 3× 价值。</em>不是多 4%，是三倍。",
    "What costs you 4% return: 1.5% advisor fee + 1% fund expense + tax drag + behavioural mistakes.":"<em>什么会吃掉 4% 回报：</em>1.5% 顾问费 + 1% 基金费用 + 税务损耗 + 行为错误。",
    "Implication: fees compound against you the same way returns compound for you.":"<em>含义：</em>费用会像回报复利一样，反向对你复利。",
    "$50K start + $0/mo: at 8% × 30yr = $503K. Boring.":"<em>$50K 起步 + $0/月：</em>8% × 30 年 = $503K。无聊。",
    "$0 start + $500/mo: at 8% × 30yr = $745K. Beats above.":"<em>$0 起步 + $500/月：</em>8% × 30 年 = $745K。超过上面。",
    "$50K start + $500/mo: at 8% × 30yr = $1.25M. The combination compounds.":"<em>$50K 起步 + $500/月：</em>8% × 30 年 = $1.25M。组合会复利。",
    "Implication: the monthly habit is what builds wealth. Lump-sum head-start helps but isn't decisive.":"<em>含义：</em>真正建立财富的是每月习惯。一次性领先有帮助，但不是决定因素。",
    "6%: Treasury-heavy / bond-leaning conservative portfolio. Real after-inflation ~3%.":"<em>6%：</em>偏美债 / 偏债券的保守组合。扣通胀后实际约 3%。",
    "8%: US S&P 500 long-run nominal average (1928-2024 = ~10%; recent decade higher; expect mean reversion). Use 8% for forward planning.":"<em>8%：</em>美国 S&P 500 长期名义平均（1928-2024 约 10%；近十年更高；应预期均值回归）。前瞻规划用 8%。",
    "10%: Active-managed equity with some alpha. Optimistic for retail without edge.":"<em>10%：</em>带一点 alpha 的主动股票组合。对没有优势的散户偏乐观。",
    "12%+: Concentrated growth / individual-stock portfolio. Achievable for short windows; very hard to sustain 20+ years. Don't plan around this.":"<em>12%+：</em>集中成长 / 个股组合。短窗口可做到，20 年以上很难持续。不要以此做规划。",
    "Report 003":"研究 003",
    "Ringgit-denominated · Bursa Malaysia":"令吉计价 · Bursa Malaysia",
    "11 picks · 5 themes · DC + banks + healthcare":"11 个标的 · 5 个主题 · 数据中心 + 银行 + 医疗",
    "3-5yr swing · zero MYR FX risk":"3-5 年波段 · 零 MYR 外汇风险",
    "KLCI + Bursa mid-cap":"KLCI + Bursa 中盘股",
    "across 5 MY themes":"覆盖 5 个马来西亚主题",
    "if forced cut to 5 names":"如果被迫切到 5 只",
    "25% · ASEAN bank franchise":"25% · 东盟银行 franchise",
    "tax-exempt at MY-resident level":"马来西亚居民层面免税",
    "01 · Five MY-specific lenses":"01 · 五个马来西亚专属视角",
    "02 · The 11 names":"02 · 11 个名字",
    "03 · Why Johor":"03 · 为什么是柔佛",
    "04 · MY-specific risks":"04 · 马来西亚专属风险",
    "Top conviction":"最高立场",
    "Income spine":"收入脊梁",
    "Asia compounder":"亚洲复利标的",
    "Steady income":"稳定收入",
    "DC build cycle":"数据中心建设周期",
    "Bank Negara OPR cut":"国家银行 OPR 下调",
    "Government utility interference":"政府干预公用事业",
    "Johor DC slowdown":"柔佛数据中心放缓",
    "Acibadem / Turkey FX (IHH)":"Acibadem / 土耳其外汇 (IHH)",
    "MYR appreciation":"MYR 升值",
    "Liquidity / Bursa retail flight":"流动性 / Bursa 散户撤退",
    "Report 004":"研究 004",
    "3 sleeves · 21 names":"3 个篮子 · 21 个名字",
    "For a Malaysian holder · tax-aware":"给马来西亚持有人 · 税务感知",
    "Total dividend names":"股息标的总数",
    "across 3 sleeves":"覆盖 3 个篮子",
    "Sleeve A allocation":"A 篮子配置",
    "US aristocrats · 25+yr raise history":"美国股息贵族 · 25 年以上增长纪录",
    "Sleeve B allocation":"B 篮子配置",
    "US high-yield specialty":"美国高股息专项",
    "Sleeve C allocation":"C 篮子配置",
    "MY ringgit · 0% source WHT, 2% tax above RM100k annual dividends":"马来西亚令吉 · 来源地 0% WHT，年度股息超过 RM100k 后 2% 税",
    "Top pick per sleeve":"每个篮子的首选",
    "if you only buy 3 names":"如果你只买 3 个名字",
    "01 · The three sleeves":"01 · 三个篮子",
    "02 · The tax math":"02 · 税务数学",
    "03 · All 21 names":"03 · 全部 21 个名字",
    "04 · The lazy path":"04 · 懒人路径",
    "05 · What kills the income":"05 · 什么会杀死收入",
    "~3.0-3.7% gross yield":"约 3.0-3.7% 总股息率",
    "~5-9% gross yield":"约 5-9% 总股息率",
    "~5-7% net yield":"约 5-7% 税后股息率",
    "US dividends":"美国股息",
    "30% withholding for Malaysia residents":"马来西亚居民 30% 预扣税",
    "MY dividends":"马来西亚股息",
    "Tax-free at receiver level":"收款人层面免税",
    "50% · Sleeve A surrogate":"50% · A 篮子替代",
    "SCHD — Schwab US Dividend Equity":"SCHD — Schwab 美国股息股票",
    "30% · Sleeve B surrogate":"30% · B 篮子替代",
    "O + VNQ — REITs concentrated":"O + VNQ — 集中 REIT",
    "20% · Sleeve C — keep singles":"20% · C 篮子 — 保留单股",
    "MAYBANK + PBBANK equal-weight":"MAYBANK + PBBANK 等权",
    "Blended outcome":"混合结果",
    "~4.3% net yield · 5 holdings total":"约 4.3% 税后股息率 · 共 5 个持仓",
    "Tax treaty change":"税务协定变化",
    "Recession dividend cuts":"衰退中砍股息",
    "Ringgit collapse":"令吉崩跌",
    "Yield trap individual names":"个股股息陷阱",
    "Bank Negara OPR cut (MY)":"国家银行 OPR 下调（马来西亚）",
    "Report 005":"研究 005",
    "26 names tracked · 13F + congressional":"跟踪 26 个名字 · 13F + 国会披露",
    "Auto-refresh weekly via Codex":"每周由 Codex 自动刷新",
    "Traders tracked":"跟踪投资人",
    "across 8 categories":"覆盖 8 个类别",
    "Value legends":"价值传奇",
    "Buffett · Ackman · Klarman · ...":"Buffett · Ackman · Klarman · ...",
    "AI / new-gen":"AI / 新世代",
    "Wood · Aschenbrenner · Thiel":"Wood · Aschenbrenner · Thiel",
    "Congressional":"国会披露",
    "via STOCK Act PTR":"来自 STOCK Act PTR",
    "Last filing deadline":"最近 filing 截止日",
    "Q1 2026 13F-HR deadline":"Q1 2026 13F-HR 截止日",
    "01 · Click any name to expand":"01 · 点击任一名字展开",
    "02 · How this works":"02 · 它如何运作",
    "All · 26":"全部 · 26",
    "Value · 8":"价值 · 8",
    "Macro · 5":"宏观 · 5",
    "Tiger Cubs · 5":"Tiger Cubs · 5",
    "Activist · 2":"激进 · 2",
    "AI / new-gen · 3":"AI / 新世代 · 3",
    "Founder · 1":"创办人 · 1",
    "Political · 1":"政治 · 1",
    "Private · 1":"私人 · 1",
    "Value":"价值",
    "Macro":"宏观",
    "Tiger Cub / growth":"Tiger Cub / 成长",
    "Tiger Cub":"Tiger Cub",
    "Activist":"激进投资",
    "Contrarian":"逆向",
    "Founder · philanthropy":"创办人 · 慈善",
    "Founder":"创办人",
    "Private — not disclosed":"私人 — 未披露",
    "AUM":"AUM",
    "Latest":"最新",
    "Notable recent change":"近期重要变化",
    "Thesis summary":"Thesis 摘要",
    "Filing details":"Filing 细节",
    "CIK":"CIK",
    "Filing period":"Filing 期间",
    "Filing date":"Filing 日期",
    "Type":"类型",
    "SEC filing":"SEC 文件",
    "Tracker":"追踪器",
    "view →":"查看 →",
    "WhaleWisdom →":"WhaleWisdom →",
    "↳ click for more":"↳ 点击查看更多",
    "13F filings":"13F 文件",
    "SEC EDGAR · quarterly":"SEC EDGAR · 每季",
    "Congressional disclosures":"国会议员披露",
    "STOCK Act PTR · 45 days post-trade":"STOCK Act PTR · 交易后 45 天",
    "Private investors":"私人投资人",
    "Not always disclosed":"不一定披露",
    "Limitations to know":"必须知道的限制",
    "Read 13F as direction, not action":"把 13F 当方向，不当操作",
    "Oracle of Omaha · long-horizon compounder":"奥马哈先知 · 长周期复利派",
    "Concentrated activist · big swings, public fights":"集中型激进投资人 · 大仓位公开战",
    "Margin of safety · cash is a position":"安全边际 · 现金也是仓位",
    "Buffett disciple · 3 ideas, full conviction":"巴菲特门徒 · 3 个想法重仓到底",
    "Magic formula · quant value at scale":"神奇公式 · 规模化量化价值",
    "Distressed debt king · second-level thinker":"困境债之王 · 第二层思考",
    "Long-short value · forensic short-seller":"多空价值派 · 法务式做空者",
    "Big Short contrarian · macro pessimist":"大空头逆向派 · 宏观悲观者",
    "All-weather principles · debt-cycle macro":"全天候原则 · 债务周期宏观",
    "Macro legend · best trader of his generation":"宏观传奇 · 同代最强交易员",
    "Distressed + macro · the Fed-listening trader":"困境 + 宏观 · 听 Fed 的交易员",
    "Event-driven activist · letter-writing brawler":"事件驱动激进派 · 公开信战斗者",
    "Reflexivity · pound-breaker dynasty":"反身性 · 击穿英镑的王朝",
    "Tiger cub · growth tech, public + private":"Tiger Cub · 成长科技，公开 + 私募",
    "Tech growth specialist · TMT-only conviction":"科技成长专家 · 只押 TMT",
    "Tiger cub · global growth at scale":"Tiger Cub · 全球成长规模化",
    "Public + private hybrid · Viking alum":"公开 + 私募混合 · Viking 出身",
    "Tiger cub · disciplined long-short equity":"Tiger Cub · 有纪律的股票多空",
    "Original activist · IEP holding-co engine":"初代激进投资人 · IEP 控股引擎",
    "Industrial activist · friendly persistent agitator":"工业激进派 · 友好但持续施压",
    "Disruptive innovation · Tesla maximalist":"颠覆式创新 · Tesla 最大主义",
    "AGI thesis fund · Decade Ahead bet":"AGI thesis 基金 · Decade Ahead 赌注",
    "Contrarian VC · SpaceX, Anduril, Anthropic backer":"逆向 VC · SpaceX、Anduril、Anthropic 支持者",
    "Long-term · durable cash-generating compounders":"长期 · 耐久现金流复利标的",
    "Congressional PTR · big-tech + selective rotation":"国会 PTR · 大科技 + 选择性轮动",
    "Not publicly disclosed · we do not track":"未公开披露 · 不追踪",
    "Report 001 · tactical tracker":"研究 001 · 战术追踪",
    "Situational Awareness LP · CIK 0002045724":"Situational Awareness LP · CIK 0002045724",
    "Q1 2026 · filed May 18, 2026":"Q1 2026 · 2026 年 5 月 18 日提交",
    "Updated each 13F deadline (Feb / May / Aug / Nov)":"每个 13F 截止日更新（2 月 / 5 月 / 8 月 / 11 月）",
    "Reported AUM":"披露 AUM",
    "Q1 2026 · 2.5× QoQ":"Q1 2026 · 环比 2.5×",
    "Long book (common + calls)":"多头账本（普通股 + calls）",
    "across 27 unique names":"覆盖 27 个独立名字",
    "Put notional":"看跌期权名义金额",
    "ALL NEW vs Q4 2025":"相对 Q4 2025 全部新增",
    "Top long":"最大多头",
    "Top put":"最大看跌",
    "The headline":"核心 headline",
    "My take":"我的看法",
    "Next deadlines":"下个截止日",
    "What he's long":"他做多什么",
    "Second-derivative bets":"二阶衍生押注",
    "What he's hedging (PUTS)":"他在对冲什么（PUTS）",
    "The megacap compute stack":"大型算力栈",
    "What he doesn't own":"他没有持有什么",
    "The omissions tell you everything":"遗漏本身说明一切",
    "The translation":"翻译成投资语言",
    "His thesis is now consensus":"他的 thesis 已经变成共识",
    "Rule 1":"规则 1",
    "Don't mirror the puts":"不要照抄看跌期权",
    "Rule 2":"规则 2",
    "His top long is too rich":"他的最大多头已经太贵",
    "Rule 3":"规则 3",
    "Use the signal, not the trade":"用信号，不抄交易",
    "Companion read":"配套阅读",
    "Full Q1 2026 deep-dive":"完整 Q1 2026 深挖",
    "Filed by Aug 14, 2026":"2026 年 8 月 14 日前提交",
    "Filed by Nov 14, 2026":"2026 年 11 月 14 日前提交",
    "Filed by Feb 14, 2027":"2027 年 2 月 14 日前提交",
    "SEC EDGAR full-text search":"SEC EDGAR 全文搜索",
    "The weekly read.":"每周一读。",
    "Free · weekly":"免费 · 每周",
    "The Sunday read":"周日阅读",
    "RSS / alt readers":"RSS / 其他阅读器",
    "Every past issue lives here. Click through to read in browser, or use the RSS feed.":"所有过去期号都在这里。点击可在浏览器阅读，也可以使用 RSS feed。",
    "~8 min read":"约 8 分钟阅读",
    "Issue #001 · The launch — three reports, one dashboard, and a Leopold curveball":"第 001 期 · 上线：三份研究、一个仪表盘，还有 Leopold 的反手球",
    "Hand-written + AI-assisted research · STATUS tags on every claim":"手写 + AI 辅助研究 · 每个 claim 都有 STATUS 标签",
    "May 20, 2026":"2026 年 5 月 20 日",
    "Liked this?":"喜欢这期？",
    "Archive":"存档",
    "GitHub repo":"GitHub 仓库",
    "US Swing 3-5yr · 10 picks":"美国 3-5 年波段 · 10 个标的",
    "Malaysia Swing · 11 picks":"马来西亚波段 · 11 个标的",
    "Dividend income · 21 picks":"股息收入 · 21 个标的",
    "Compound calculator":"复利计算器",
    "dashboardAboutCopy":"DAINER Finance 是一个操盘者关于市场、标的和资本的开放笔记。公开构建。不是财务建议，只是研究产物。每个标的都可从引用来源独立核验。",
    "usAnthropicSeriesG":"<em>Series G：</em>2026 年 2 月完成，post-money $380B",
    "usAnthropicRevenue":"<em>收入：</em>截至 2026 年 3 月年化 $19B，高于 1 月 $9B",
    "usAnthropicCounsel":"<em>法律顾问：</em>聘请 Wilson Sonsini（Google + LinkedIn 也用过同一家）",
    "usAnthropicSecondary":"<em>二级市场：</em>隐含估值超过 $1T（Octagon AI，2026 年 5 月）",
    "usAnthropicSpokes":"<em>发言人：</em>“尚未决定何时、甚至是否上市”",
    "usAnthropicJuly":"<em>2026 年 7 月：</em>传闻中的 confidential S-1 提交窗口，Metaculus 概率 66%",
    "usAnthropicOctober":"<em>2026 年 10 月：</em>The Information 认为最早现实上市时间",
    "usAnthropicQ4":"<em>2026 Q4：</em>管理层内部讨论过的目标",
    "usAnthropicReality":"<em>现实：</em>Stripe / SpaceX / OpenAI 已经连续多年被传“Q4 上市”",
    "usAnthropicForge":"<em>Forge / EquityZen 二级：</em>仅合格投资人，最低 $50-100K，上一轮 2-3×",
    "usAnthropicAmzn":"<em>AMZN：</em>已投 $8B + AWS 主云，是最接近的公开 proxy",
    "usAnthropicGoogl":"<em>GOOGL：</em>约投 $3B",
    "usAnthropicMsft":"<em>本组合 proxy：</em>MSFT（11% 配置）—— OpenAI 侧，不同实验室但同一个 thesis",
    "usAnthropicWait":"<em>我会做的：</em>等 S-1 出来",
    "usAnthropicDay1":"<em>IPO 后第 1 天</em>通常是最差入场点，锁定期 +6 个月才是内部人释放流动性的时候",
    "usAnthropicEdgar":"<em>盯 SEC EDGAR ticker：</em>confidential S-1 通常在 roadshow 前约 15 天公开",
    "usAnthropicNoSecondary":"<em>不要在二级市场付上一轮 2-3×</em>，除非你是 5 年以上期限",
    "usAnthropicMax":"<em>任何单一 AI lab IPO</em>最多占账本 5%",
    "usExecWeek1":"<em>第 1 周：</em>按市价买入全部 10 个仓位的 50% 名义金额。不要优化入场点。",
    "usExecWeek3":"<em>第 3 周：</em>再买 25%。如果某个名字从第 1 周跌了 8%+，把那一片加倍。",
    "usExecWeek58":"<em>第 5-8 周：</em>逢低买剩余 25%。在交易里，比试图聪明择时更重要。",
    "usExecEtf":"<em>ETF 快捷路径：</em>ITA + SMH 可在第 1 周一次性买入。结构上已经分散。",
    "usExecTrim":"<em>单一仓位 > 18%：</em>把超出部分的 25% 剪回落后者（大多会发生在 TSM）。",
    "usExecDrop":"<em>单一仓位跌 25%：</em>如果没有 thesis-break 新闻，就加。如果是催化剂导致，砍到 0。",
    "usExecAnnual":"<em>2027 年 5 月年度重置：</em>重新跑同样的 5-agent research。",
    "usExecTaxLots":"<em>税批次：</em>长期资本利得从第 13 个月开始。",
    "myDcGridWhat":"<em>是什么：</em>每个柔佛数据中心每度电都要向 TENAGA 付电网通行费。法定垄断，无法被绕开。",
    "myDcGridCatalyst":"<em>催化剂：</em>RP4 电价文件锁定；每个数据中心接入都会扩大受监管资产基础。",
    "myDcGridYield":"<em>股息率：</em>远期 3.74-3.95%。P/E 约 16-17x，相对历史 13x 的溢价由数据中心叙事驱动。",
    "myDcYtlWhat":"<em>是什么：</em>垂直押注：拥有土地、发电资产、数据中心租户。NVIDIA 锚定的 AI 集群。",
    "myDcYtlCatalyst":"<em>催化剂：</em>5 年从 500MW 扩到 1.3GW。英国 Wessex 水务提供受监管现金流稳定性。",
    "myDcYtlYield":"<em>股息率：</em>2.0%（FY25 DPS 8 sen）。远期 P/E 约 12x。持有是为了产能爬坡，不是为了股息率。",
    "myDcGamudaWhat":"<em>是什么：</em>马来西亚最大承包商。RM37bn 订单储备，45-50% 是数据中心土建，另有澳洲交通和台湾分散。",
    "myDcGamudaCatalyst":"<em>催化剂：</em>CY26 年底订单储备目标 RM50bn。MRT3 待授标。越南扩张。",
    "myDcGamudaYield":"<em>股息率：</em>约 1.5%（较低；这是成长打法，不是收入打法）。",
    "myDcNatgateWhat":"<em>是什么：</em>NationGate 是东南亚唯一 NVIDIA Original Equipment Manufacturer 伙伴，为区域数据中心运营商组装 AI server racks。",
    "myDcNatgateCatalyst":"<em>催化剂：</em>FY24 收入同比 +720%。订单能见度延伸到 2026 年中。",
    "myDcNatgateYield":"<em>股息率：</em>极低（成长阶段）。四者里 beta 最高，也有集中单一客户 / NVDA 风险。",
    "divTaxUsDefault":"<em>默认：</em>每一笔股息 30% 美国联邦预扣税",
    "divTaxUsW8":"<em>W-8BEN：</em>确认外国身份，但马来西亚不在 IRS 美国所得税协定名单内",
    "divTaxUsNet":"<em>有效税后：</em>4% 总股息率 × 0.70 = 2.8% 税后",
    "divTaxUsEtf":"<em>ETF 分配：</em>和个股股息同样处理",
    "divTaxUsAction":"<em>该做什么：</em>仍然向 IBKR / Charles Schwab / Saxo / 任意券商提交 W-8BEN，确保账户文件正确。",
    "divTaxMySingle":"<em>单层制度：</em>股息税由公司缴纳（公司税 24%）；收款人不再被征税",
    "divTaxMyNet":"<em>有效税后：</em>5% 总股息率 × 1.00 = 5% 税后",
    "divTaxMyCompare":"<em>比较：</em>5% 美国总股息率变成 4.25% 税后；5% 马来西亚总股息率仍是 5% 税后",
    "divTaxMyWhy":"<em>为什么有 MY 令吉篮子：</em>总股息率相同下，纯收益率更偏向马股",
    "divTaxMyOffset":"<em>抵消因素：</em>5-10 年 MYR 对 USD 贬值，见风险部分。正确组合是在税后收益率和外汇之间取平衡。",
    "divEtfSchdYield":"<em>股息率：</em>约 3.5% (TTM)",
    "divEtfSchdExpense":"<em>费用：</em>0.06%（市场上最便宜的股息 ETF）",
    "divEtfSchdOwns":"<em>持有什么：</em>100 个美国质量股息名字，按增长、可持续性和资产负债表筛选",
    "divEtfSchdWhy":"<em>为什么胜过个股：</em>跟踪和 A 篮子相同的股票池，但没有单一名字砍股息风险",
    "divLazyNet":"<em>税后股息率：</em>约 3.5% × 0.5 + 约 5% × 0.3 + 约 5.5% × 0.2 = 约 4.35% 混合税后",
    "divLazyFatigue":"<em>决策疲劳：</em>5 个持仓 vs 21 个。季度再平衡很简单。",
    "divLazyTax":"<em>税务效率：</em>SCHD + VNQ + O 更简单，但马来西亚居民仍面对美国预扣税。MY 双股来源地 0% WHT，但要模拟 RM100k 年度股息门槛。",
    "divLazyTradeoff":"<em>相对选股的取舍：</em>你失去 A 篮子主动筛选可能多拿的约 50bps；但避开所有单一名字砍股息风险。",

    // Codex i18n second coverage pass
    "14% allocation · 5y ROIC 35.1%\nFoundry monopoly · no second source":"14% 配置 · 5 年 ROIC 35.1%\n晶圆代工垄断 · 无第二来源",
    "30% allocation":"30% 配置",
    "20% allocation":"20% 配置",
    "21% allocation":"21% 配置",
    "19% allocation":"19% 配置",
    "10% allocation":"10% 配置",
    "Click any pick to open the thesis.":"点击任一标的，打开 thesis。",
    "Click any pick to open the thesis":"点击任一标的，打开 thesis",
    "PICK · 01":"标的 · 01",
    "PICK · 02":"标的 · 02",
    "PICK · 03":"标的 · 03",
    "PICK · 04":"标的 · 04",
    "PICK · 05":"标的 · 05",
    "PICK · 06":"标的 · 06",
    "PICK · 07":"标的 · 07",
    "PICK · 08":"标的 · 08",
    "PICK · 09":"标的 · 09",
    "PICK · 10":"标的 · 10",
    "PICK · 11":"标的 · 11",
    "PICK · 12":"标的 · 12",
    "PICK · 13":"标的 · 13",
    "PICK · 14":"标的 · 14",
    "PICK · 15":"标的 · 15",
    "PICK · 16":"标的 · 16",
    "PICK · 17":"标的 · 17",
    "PICK · 18":"标的 · 18",
    "PICK · 19":"标的 · 19",
    "PICK · 20":"标的 · 20",
    "PICK · 21":"标的 · 21",
    "5Y ROIC":"5 年 ROIC",
    "FCF TTM":"TTM FCF",
    "NET DEBT":"净负债",
    "FWD P/E":"远期市盈率",
    "ROE":"ROE",
    "Yield":"股息率",
    "5y DGR":"5 年 DGR",
    "Payout":"派息率",
    "Fwd P/E":"远期市盈率",
    "↳ click for full thesis":"↳ 点击查看完整 thesis",
    "AI INFRA · FOUNDRY":"AI 基建 · 晶圆代工",
    "HEALTHCARE · GLP-1":"医疗 · GLP-1",
    "QUALITY · MEGA-CAP AI":"质量股 · Mega-cap AI",
    "QUALITY · PAYMENTS":"质量股 · 支付",
    "ENERGY · NUCLEAR":"能源 · 核电",
    "DEFENSE · ETF — ALL PRIMES":"国防 · ETF — 全主承包商",
    "ENERGY · ELECTRIFICATION":"能源 · 电气化",
    "AI INFRA · NETWORKING":"AI 基建 · 网络",
    "HEALTHCARE · GENE-TX":"医疗 · 基因治疗",
    "AI INFRA · ETF — SEMI BREADTH":"AI 基建 · ETF — 半导体广度",
    "Quality / financials":"质量 / 金融",
    "Quality / lowest-risk bank":"质量 / 低风险银行",
    "Quality / re-rating play":"质量 / 重估打法",
    "Healthcare / Asia scale":"医疗 / 亚洲规模",
    "Energy / monopoly grid":"能源 / 垄断电网",
    "AI infra / DC + multi-utility":"AI 基建 / 数据中心 + 多元公用事业",
    "Reshoring / construction":"回流 / 建设",
    "AI infra / NVIDIA OEM partner":"AI 基建 / NVIDIA OEM 伙伴",
    "AI infra / semicon equipment":"AI 基建 / 半导体设备",
    "Industrial / diversified":"工业 / 多元化",
    "Energy / fuel retail":"能源 / 燃油零售",
    "Sleeve A · US Aristocrats":"A 篮子 · 美国股息贵族",
    "Sleeve B · US High-yield":"B 篮子 · 美国高股息",
    "Sleeve C · MY Ringgit":"C 篮子 · 马来西亚令吉",
    "Source currency: USD. Rule source: US-source FDAP dividends paid to a nonresident alien are generally subject to 30% withholding. Malaysia is not on the IRS income tax treaty list, so the conservative default is 30%.":"来源货币：USD。规则来源：支付给非居民外国人的美国来源 FDAP 股息通常适用 30% 预扣税。马来西亚不在 IRS 所得税协定名单内，所以保守默认值是 30%。",
    "Caveat: W-8BEN confirms foreign status; it does not create a reduced US treaty rate for Malaysia residents.":"注意：W-8BEN 只是确认外国身份；它不会为马来西亚居民创造更低的美国协定税率。",
    "来源货币: USD. 规则来源: US-source FDAP dividends paid to a nonresident alien are generally subject to 30% withholding. Malaysia is not on the IRS income tax treaty list, so the conservative default is 30%.":"来源货币：USD。规则来源：支付给非居民外国人的美国来源 FDAP 股息通常适用 30% 预扣税。马来西亚不在 IRS 所得税协定名单内，所以保守默认值是 30%。",
    "注意: W-8BEN confirms foreign status; it does not create a reduced US treaty rate for Malaysia residents.":"注意：W-8BEN 只是确认外国身份；它不会为马来西亚居民创造更低的美国协定税率。",
    "Situational Awareness LP files Q1 2026 13F — $13.68B AUM, $8.5B in NEW puts":"Situational Awareness LP 提交 2026 Q1 13F：AUM $13.68B，新建 $8.5B 看跌期权",
    "Leopold Aschenbrenner's fund flips to long/short barbell. SMH ETF put $2B notional, NVDA put $1.57B. Top long still SanDisk at $1.11B.":"Leopold Aschenbrenner 的基金切成长短仓杠铃。SMH ETF 看跌名义金额 $2B，NVDA 看跌 $1.57B。最大多头仍是 SanDisk，金额 $1.11B。",
    "Anthropic eyeing Q4 2026 IPO — Wilson Sonsini hired, $19B annualized revenue":"Anthropic 目标 2026 Q4 IPO：已聘 Wilson Sonsini，年化收入 $19B",
    "Internal target Q4 2026, October at earliest. S-1 confidential filing rumored for July window. Metaculus prediction market: 66% odds before July 1.":"内部目标 2026 Q4，最早 10 月。传闻 7 月窗口 confidential S-1。Metaculus 预测市场给 7 月 1 日前提交 66% 概率。",
    "TSMC 2nm ramp on track — Arizona Fab 2 first wafers Q4 2026":"TSMC 2nm 爬坡按计划推进：Arizona Fab 2 首批晶圆 2026 Q4",
    "TSM 2026 capex $56B. Arizona fabs derisk geopolitically. CoWoS advanced packaging still the rate-limit on every Nvidia/AMD accelerator shipped.":"TSM 2026 年资本开支 $56B。Arizona fab 降低地缘政治风险。CoWoS 先进封装仍是每颗 Nvidia/AMD 加速器出货的速率限制。",
    "Eli Lilly's orforglipron cardiovascular outcomes data — full readout October 2026":"Eli Lilly orforglipron 心血管结局数据：完整读数 2026 年 10 月",
    "If positive, GLP-1 label extends from endocrinologists to general practitioners. Primary care prescription channel = TAM expansion materially.":"如果结果正面，GLP-1 标签会从内分泌科扩展到普通全科医生。基层处方渠道 = TAM 实质扩大。",
    "The single physical bottleneck of the AI compute stack. Every credible 5yr scenario requires more TSM wafers.":"AI 算力栈的单一物理瓶颈。任何可信的 5 年情景，都需要更多 TSM 晶圆。",
    "Owns the structural winner in the largest pharma category in history. Only commercial oral GLP-1.":"拥有史上最大药品类别里的结构性赢家。唯一商业化口服 GLP-1。",
    "Only Magnificent-7 with both AI revenue ramp AND durable enterprise lock-in. Azure AI = the real moat.":"唯一同时拥有 AI 收入爬坡和耐久企业锁定的 Magnificent-7。Azure AI 才是真护城河。",
    "The single most durable network-effect compounder in public equity. Every digital payment globally pays a tax to Visa.":"公开市场里最耐久的网络效应复利标的。全球每笔数字支付都向 Visa 交税。",
    "Largest unregulated nuclear fleet in US. Hyperscalers signing direct PPAs at premium pricing for clean-firm power.":"美国最大非受监管核电舰队。超大规模云厂商为稳定清洁电力签溢价直购 PPA。",
    "The defense theme in one ticker. Captures LMT, RTX, NOC, GD, HII, BA + mid-cap defense tech.":"一个 ticker 打包国防主题。覆盖 LMT、RTX、NOC、GD、HII、BA 以及中盘国防科技。",
    "The only name appearing in three of five research themes — AI infra, energy/electrification, quality compounders.":"唯一同时出现在 5 个研究主题中 3 个的名字：AI 基建、能源/电气化、质量复利标的。",
    "The Ethernet-for-AI thesis is now Arista's tailwind. Industry shift from InfiniBand to Ethernet happens on Arista boxes.":"AI 以太网 thesis 正在变成 Arista 的顺风。行业从 InfiniBand 转向 Ethernet，会落在 Arista 盒子上。",
    "Three-platform biotech that's already profitable — rare. Net cash, 22× forward P/E, asymmetric pipeline.":"已经盈利的三平台 biotech，很少见。净现金、22× 远期市盈率、非对称管线。",
    "The semi complex in one ticker. NVDA, AVGO, AMD, ASML, AMAT, LRCX, KLAC — names not held individually but worth owning at index weight.":"一个 ticker 拿下半导体复合体。NVDA、AVGO、AMD、ASML、AMAT、LRCX、KLAC，不单独持有但值得指数权重拥有。",
    "Buying the deposit franchise of ASEAN at 1.3x book with a 5.9% yield.":"用 1.3x 账面值买东盟存款 franchise，同时拿 5.9% 股息率。",
    "Lowest-risk bank in Malaysia at 5% yield — the Berkshire of MY banking.":"马来西亚最低风险银行，股息率 5%：马来西亚银行业的 Berkshire。",
    "Forward30 strategy delivering — record dividend, ROE re-rating sub-9 → 11%+.":"Forward30 策略兑现：纪录股息，ROE 从低于 9% 重估到 11%+。",
    "Aging Asia + medical tourism + 1,000 new beds added FY24 = double-digit ROE by 2026.":"亚洲老龄化 + 医疗旅游 + FY24 新增 1,000 张床 = 2026 年双位数 ROE。",
    "Every Johor DC (Microsoft, AWS, Google, ByteDance, Equinix) pays TENAGA the grid toll.":"每个柔佛数据中心（Microsoft、AWS、Google、ByteDance、Equinix）都要向 TENAGA 付电网通行费。",
    "Owns AND operates the Johor DC — vertical bet (land + power + tenancy). 500MW → 1.3GW.":"拥有并运营柔佛数据中心：垂直押注（土地 + 电力 + 租户）。500MW → 1.3GW。",
    "RM37bn orderbook, 45-50% DC exposure. Pure-play on ASEAN DC build cycle.":"RM37bn 订单储备，45-50% 数据中心敞口。东盟数据中心建设周期的纯打法。",
    "FY24 revenue +720% YoY. The only public-market way to be downstream of NVDA in MY.":"FY24 收入同比 +720%。马股里唯一公开市场方式押注 NVDA 下游。",
    "3D AOI IP moat in semiconductor test. Cycle bottoming as memory + leading-edge logic capex returns.":"半导体测试里的 3D AOI IP 护城河。随着内存 + 先进逻辑资本开支回归，周期正在见底。",
    "Diversified conglomerate at 9x P/E with UMW automotive integration tailwind.":"9x P/E 的多元集团，背后有 UMW 汽车整合顺风。",
    "18%+ ROE + 4.7% yield from dominant fuel retail. Cash machine.":"主导燃油零售带来 18%+ ROE + 4.7% 股息率。现金机器。",
    "\"Post-Humira-cliff survivor.\"":"“Humira 专利悬崖后的幸存者。”",
    "\"Frito-Lay snack moat (~25% margin) cross-subsidises beverage.\"":"“Frito-Lay 零食护城河（约 25% 利润率）反哺饮料业务。”",
    "\"Pharmaceutical + medical devices duopoly post-Kenvue spin (cleaner business).\"":"“Kenvue 拆分后，药品 + 医疗器械双核心，业务更干净。”",
    "\"Beverage portfolio breadth (Coke + Sprite + waters + coffees) protects from category shifts.\"":"“饮料组合够宽（Coke + Sprite + 水 + 咖啡），能抵御品类迁移。”",
    "\"NY-NJ regulated utility — ConEd has the most predictable regulated return profile in US utility sector.\"":"“NY-NJ 受监管公用事业，ConEd 在美国公用事业里回报最可预测。”",
    "\"Consumer staples mega-brand portfolio.\"":"“消费必需品巨型品牌组合。”",
    "\"Duopoly with LOW.\"":"“与 LOW 形成双寡头。”",
    "\"Same housing-age tailwind as HD.\"":"“和 HD 一样享受房龄老化顺风。”",
    "\"Monthly-dividend REIT.\"":"“月度派息 REIT。”",
    "\"Largest publicly-traded BDC.\"":"“最大上市 BDC。”",
    "\"Lower-middle-market BDC + internally managed.\"":"“低中端市场 BDC + 内部管理。”",
    "\"Largest North American midstream pipeline.\"":"“北美最大中游管道。”",
    "\"US largest natural gas pipeline network.\"":"“美国最大天然气管网。”",
    "\"Telco yield play.\"":"“通信股息率打法。”",
    "\"ASEAN bank franchise.\"":"“东盟银行 franchise。”",
    "\"Lowest NPL in MY (sub-0.4%).\"":"“马来西亚最低 NPL（低于 0.4%）。”",
    "\"Monopoly grid utility.\"":"“垄断电网公用事业。”",
    "\"Dominant MY fuel retail.\"":"“马来西亚主导燃油零售。”",
    "\"MY telco yield play.\"":"“马来西亚通信股息率打法。”",
    "\"Diversified MY REIT — retail malls + hotels + offices + medical.\"":"“多元马来西亚 REIT：商场 + 酒店 + 办公 + 医疗。”",
    "\"Pure prime-mall MY REIT — Pavilion KL anchor.\"":"“纯高端商场马来西亚 REIT，以 Pavilion KL 为锚。”",

    "heroPanelTsmSub":"14% 配置 · 5 年 ROIC 35.1%<br>晶圆代工垄断 · 无第二来源",

    // Codex i18n third coverage pass
    "\"Oracle of Omaha · long-horizon compounder\"":"“奥马哈先知 · 长周期复利派”",
    "\"Concentrated activist · big swings, public fights\"":"“集中型激进投资人 · 大仓位公开战”",
    "\"Margin of safety · cash is a position\"":"“安全边际 · 现金也是仓位”",
    "\"Buffett disciple · 3 ideas, full conviction\"":"“巴菲特门徒 · 3 个想法重仓到底”",
    "\"Magic formula · quant value at scale\"":"“神奇公式 · 规模化量化价值”",
    "\"Distressed debt king · second-level thinker\"":"“困境债之王 · 第二层思考”",
    "\"Long-short value · forensic short-seller\"":"“多空价值派 · 法务式做空者”",
    "\"Big Short contrarian · macro pessimist\"":"“大空头逆向派 · 宏观悲观者”",
    "\"All-weather principles · debt-cycle macro\"":"“全天候原则 · 债务周期宏观”",
    "\"Macro legend · best trader of his generation\"":"“宏观传奇 · 同代最强交易员”",
    "\"Distressed + macro · the Fed-listening trader\"":"“困境 + 宏观 · 听 Fed 的交易员”",
    "\"Event-driven activist · letter-writing brawler\"":"“事件驱动激进派 · 公开信战斗者”",
    "\"Reflexivity · pound-breaker dynasty\"":"“反身性 · 击穿英镑的王朝”",
    "\"Tiger cub · growth tech, public + private\"":"“Tiger Cub · 成长科技，公开 + 私募”",
    "\"Tech growth specialist · TMT-only conviction\"":"“科技成长专家 · 只押 TMT”",
    "\"Tiger cub · global growth at scale\"":"“Tiger Cub · 全球成长规模化”",
    "\"Public + private hybrid · Viking alum\"":"“公开 + 私募混合 · Viking 出身”",
    "\"Tiger cub · disciplined long-short equity\"":"“Tiger Cub · 有纪律的股票多空”",
    "\"Original activist · IEP holding-co engine\"":"“初代激进投资人 · IEP 控股引擎”",
    "\"Industrial activist · friendly persistent agitator\"":"“工业激进派 · 友好但持续施压”",
    "\"Disruptive innovation · Tesla maximalist\"":"“颠覆式创新 · Tesla 最大主义”",
    "\"AGI thesis fund · Decade Ahead bet\"":"“AGI thesis 基金 · Decade Ahead 赌注”",
    "\"Contrarian VC · SpaceX, Anduril, Anthropic backer\"":"“逆向 VC · SpaceX、Anduril、Anthropic 支持者”",
    "\"Long-term · durable cash-generating compounders\"":"“长期 · 耐久现金流复利标的”",
    "\"Congressional PTR · big-tech + selective rotation\"":"“国会 PTR · 大科技 + 选择性轮动”",
    "\"Not publicly disclosed · we do not track\"":"“未公开披露 · 不追踪”",
    "HELD":"持有",
    "held":"持有",
    "ADDED":"增持",
    "added":"增持",
    "NEW BUY":"新买入",
    "new buy":"新买入",
    "TIGER CUBS · 5":"Tiger Cubs · 5",
    "REDUCED -0.71%":"减持 -0.71%",
    "REDUCED -35.17%":"减持 -35.17%",
    "ADDED +19.19%":"增持 +19.19%",
    "REDUCED -0.82%":"减持 -0.82%",
    "ADDED +47.01%":"增持 +47.01%",
    "REDUCED -5.30%":"减持 -5.30%",
    "ADDED +0.46%":"增持 +0.46%",
    "REDUCED -24.58%":"减持 -24.58%",
    "ADDED +6.77%":"增持 +6.77%",
    "Memory: SNDK $1.11B (tripled vs Q4) — HBM3E supply scarcity":"Memory：SNDK $1.11B（较 Q4 三倍）—— HBM3E 供应稀缺",
    "Power: BE (Bloom Energy) $934M — behind-the-meter fuel cells for DCs":"Power：BE (Bloom Energy) $934M —— 数据中心 behind-the-meter 燃料电池",
    "GPU cloud: CRWV $697M — neocloud arb vs NVDA valuation premium":"GPU cloud：CRWV $697M —— neocloud 相对 NVDA 估值溢价的套利",
    "DC real-estate: APLD $320M — Applied Digital landlord model":"数据中心地产：APLD $320M —— Applied Digital 房东模型",
    "Miners → AI: IREN, CORZ, RIOT, CLSK, BITF, BTDR — BTC miners pivoting to HPC at 5-10x revenue per MW":"矿工 → AI：IREN、CORZ、RIOT、CLSK、BITF、BTDR —— BTC 矿工转向 HPC，每 MW 收入提升到 5-10x",
    "SMH ETF: SMH $2.04B notional — semi complex hedge":"SMH ETF：SMH $2.04B 名义金额 —— 半导体复合体对冲",
    "NVIDIA: NVDA $1.57B":"NVIDIA：NVDA $1.57B",
    "Oracle: ORCL $1.07B":"Oracle：ORCL $1.07B",
    "Broadcom: AVGO $1.01B":"Broadcom：AVGO $1.01B",
    "AMD: AMD $969M":"AMD：AMD $969M",
    "Plus: MU, TSM, ASML, INTC, GLW (Corning) all NEW puts":"另外：MU、TSM、ASML、INTC、GLW (Corning) 全部是新增 puts",
    "No hyperscalers: zero MSFT, GOOGL, META, AMZN":"没有超大规模云：MSFT、GOOGL、META、AMZN 全部为 0",
    "No defense AI: zero PLTR, BAH, AXON":"没有国防 AI：PLTR、BAH、AXON 全部为 0",
    "No utility nuclear: zero CEG, VST, NEE — he chose on-site fuel cell over grid nuclear":"没有公用事业核电：CEG、VST、NEE 全部为 0 —— 他选择现场燃料电池，而不是电网核电",
    "No networking: zero ANET (which surprised me — he's a CRWV bull but skips the GPU network spine)":"没有网络：ANET 为 0（这让我意外，他看多 CRWV，却跳过 GPU 网络脊柱）",
    "June 2024: \"Situational Awareness\" essay calls for $1T training runs by 2028":"2024 年 6 月：“Situational Awareness” 文章提出 2028 年 $1T 训练运行",
    "Q1 2026: consensus has caught up. NVDA at $5T mkt cap. Hyperscaler capex at all-time high.":"2026 Q1：共识已经追上。NVDA 市值 $5T，超大规模云资本开支历史高位。",
    "His move: short the consensus implementation, long the picks-and-shovels nobody is talking about":"他的动作：做空共识实现路径，做多没人讨论的卖铲人",
    "If he's right: 12-month underperformance of NVDA/AVGO vs BE/CRWV/IREN":"如果他对：未来 12 个月 NVDA/AVGO 跑输 BE/CRWV/IREN",
    "If he's wrong: his puts decay, his longs (already +50-100% from his cost basis) give back some of the gains":"如果他错：puts 衰减，多头（相对成本已 +50-100%）吐回部分收益",
    "90-day window after Jun 30 quarter end. Watch for: did he add to BE / CRWV / IREN, or rotate? Did the puts get rolled?":"6 月 30 日季度结束后的 90 天窗口。重点看：他是否加 BE / CRWV / IREN，还是轮动？puts 是否展期？",
    "Post-hyperscaler Q3 earnings cycle. If his SMH puts proved right (NVDA / AVGO underperformance), expect doubling-down.":"超大规模云 Q3 业绩周期之后。如果他的 SMH puts 证明正确（NVDA / AVGO 跑输），预期会加码。",
    "Year-end snapshot. Most-watched filing because it shows the full-year positioning.":"年末快照。最受关注的 filing，因为它显示全年定位。",
    "efts.sec.gov/LATEST/search-index?q=%22Situational+Awareness%22&forms=13F-HR — returns clean JSON of both LP + Partners LP filings.":"efts.sec.gov/LATEST/search-index?q=%22Situational+Awareness%22&forms=13F-HR —— 返回 LP + Partners LP 两份 filing 的干净 JSON。",
    "Full research markdown is local-only, not published on GitHub Pages":"完整研究 markdown 只在本地，不发布到 GitHub Pages",
    "Next refresh: 2026-08-14 (Q2 deadline)":"下次刷新：2026-08-14（Q2 截止日）",
    "RSS feed: /newsletter/feed.xml — paste into any reader (Feedly, NetNewsWire, Reeder, Inoreader)":"RSS feed：/newsletter/feed.xml —— 粘到任何阅读器（Feedly、NetNewsWire、Reeder、Inoreader）",
    "GitHub: watch the repo for new issue commits":"GitHub：关注 repo 的新期号 commit",
    "What's in each issue: portfolio update · 3-5 news cards · 1 deep idea · what changed my mind":"每期内容：组合更新 · 3-5 张新闻卡 · 1 个深想法 · 我改变看法的地方",
    "What's NOT in: tips, alerts, \"act now\", paywalled premium tier. None of that.":"不会有：tips、alerts、“马上行动”、付费高级层。都没有。",
    "US 3-5yr swing":"美国 3-5 年波段",
    "Malaysia swing":"马来西亚波段",
    "Dividend income":"股息收入",
    "RSS feed":"RSS feed",

    // Codex i18n third coverage attrs
    "\"Oracle of Omaha · long-horizon compounder\"":"“奥马哈先知 · 长周期复利派”",
    "\"Concentrated activist · big swings, public fights\"":"“集中型激进投资人 · 大仓位公开战”",
    "\"Margin of safety · cash is a position\"":"“安全边际 · 现金也是仓位”",
    "\"Buffett disciple · 3 ideas, full conviction\"":"“巴菲特门徒 · 3 个想法重仓到底”",
    "\"Magic formula · quant value at scale\"":"“神奇公式 · 规模化量化价值”",
    "\"Distressed debt king · second-level thinker\"":"“困境债之王 · 第二层思考”",
    "\"Long-short value · forensic short-seller\"":"“多空价值派 · 法务式做空者”",
    "\"Big Short contrarian · macro pessimist\"":"“大空头逆向派 · 宏观悲观者”",
    "\"All-weather principles · debt-cycle macro\"":"“全天候原则 · 债务周期宏观”",
    "\"Macro legend · best trader of his generation\"":"“宏观传奇 · 同代最强交易员”",
    "\"Distressed + macro · the Fed-listening trader\"":"“困境 + 宏观 · 听 Fed 的交易员”",
    "\"Event-driven activist · letter-writing brawler\"":"“事件驱动激进派 · 公开信战斗者”",
    "\"Reflexivity · pound-breaker dynasty\"":"“反身性 · 击穿英镑的王朝”",
    "\"Tiger cub · growth tech, public + private\"":"“Tiger Cub · 成长科技，公开 + 私募”",
    "\"Tech growth specialist · TMT-only conviction\"":"“科技成长专家 · 只押 TMT”",
    "\"Tiger cub · global growth at scale\"":"“Tiger Cub · 全球成长规模化”",
    "\"Public + private hybrid · Viking alum\"":"“公开 + 私募混合 · Viking 出身”",
    "\"Tiger cub · disciplined long-short equity\"":"“Tiger Cub · 有纪律的股票多空”",
    "\"Original activist · IEP holding-co engine\"":"“初代激进投资人 · IEP 控股引擎”",
    "\"Industrial activist · friendly persistent agitator\"":"“工业激进派 · 友好但持续施压”",
    "\"Disruptive innovation · Tesla maximalist\"":"“颠覆式创新 · Tesla 最大主义”",
    "\"AGI thesis fund · Decade Ahead bet\"":"“AGI thesis 基金 · Decade Ahead 赌注”",
    "\"Contrarian VC · SpaceX, Anduril, Anthropic backer\"":"“逆向 VC · SpaceX、Anduril、Anthropic 支持者”",
    "\"Long-term · durable cash-generating compounders\"":"“长期 · 耐久现金流复利标的”",
    "\"Congressional PTR · big-tech + selective rotation\"":"“国会 PTR · 大科技 + 选择性轮动”",
    "\"Not publicly disclosed · we do not track\"":"“未公开披露 · 不追踪”",
    "No networking: zero ANET (which surprised me — he's a CRWV bull but skips the GPU network spine)":"没有网络：ANET 为 0（这让我意外，他看多 CRWV，却跳过 GPU 网络脊柱）",
    "June 2024: \"Situational Awareness\" essay calls for $1T training runs by 2028":"2024 年 6 月：“Situational Awareness” 文章提出 2028 年 $1T 训练运行",
    "If he's right: 12-month underperformance of NVDA/AVGO vs BE/CRWV/IREN":"如果他对：未来 12 个月 NVDA/AVGO 跑输 BE/CRWV/IREN",
    "If he's wrong: his puts decay, his longs (already +50-100% from his cost basis) give back some of the gains":"如果他错：puts 衰减，多头（相对成本已 +50-100%）吐回部分收益",
    "What's in each issue: portfolio update · 3-5 news cards · 1 deep idea · what changed my mind":"每期内容：组合更新 · 3-5 张新闻卡 · 1 个深想法 · 我改变看法的地方",
    "What's NOT in: tips, alerts, \"act now\", paywalled premium tier. None of that.":"不会有：tips、alerts、“马上行动”、付费高级层。都没有。",
    "leoAuto4":"Power：BE (Bloom Energy) $934M —— 数据中心 behind-the-meter 燃料电池",
    "leoAuto7":"GPU cloud：CRWV $697M —— neocloud 相对 NVDA 估值溢价的套利",
    "leoAuto10":"数据中心地产：APLD $320M —— Applied Digital 房东模型",
    "leoAuto16":"SMH ETF：SMH $2.04B 名义金额 —— 半导体复合体对冲",
    "leoAuto19":"NVIDIA：NVDA $1.57B",
    "leoAuto22":"Oracle：ORCL $1.07B",
    "leoAuto25":"Broadcom：AVGO $1.01B",
    "leoAuto28":"AMD：AMD $969M",
    "leoAuto34":"没有超大规模云：MSFT、GOOGL、META、AMZN 全部为 0",
    "leoAuto37":"没有国防 AI：PLTR、BAH、AXON 全部为 0",
    "leoAuto40":"没有公用事业核电：CEG、VST、NEE 全部为 0 —— 他选择现场燃料电池，而不是电网核电",
    "leoAuto43":"没有网络：ANET 为 0（这让我意外，他看多 CRWV，却跳过 GPU 网络脊柱）",
    "leoAuto46":"2024 年 6 月：“Situational Awareness” 文章提出 2028 年 $1T 训练运行",
    "leoAuto49":"2026 Q1：共识已经追上。NVDA 市值 $5T，超大规模云资本开支历史高位。",
    "leoAuto52":"他的动作：做空共识实现路径，做多没人讨论的卖铲人",
    "leoAuto55":"如果他对：未来 12 个月 NVDA/AVGO 跑输 BE/CRWV/IREN",
    "leoAuto58":"如果他错：puts 衰减，多头（相对成本已 +50-100%）吐回部分收益",
    "leoAutoP62":"6 月 30 日季度结束后的 90 天窗口。重点看：他是否加 BE / CRWV / IREN，还是轮动？puts 是否展期？",
    "leoAutoP65":"超大规模云 Q3 业绩周期之后。如果他的 SMH puts 证明正确（NVDA / AVGO 跑输），预期会加码。",
    "leoAutoP68":"年末快照。最受关注的 filing，因为它显示全年定位。",
    "leoAutoP71":"efts.sec.gov/LATEST/search-index?q=%22Situational+Awareness%22&forms=13F-HR —— 返回 LP + Partners LP 两份 filing 的干净 JSON。",
    "leoAuto73":"完整研究 markdown 只在本地，不发布到 GitHub Pages",
    "leoAutoP77":"下次刷新：2026-08-14（Q2 截止日）",

    // Codex i18n fourth coverage pass
    "Net debt":"净负债",
    "net cash":"净现金",
    "−$71B (cash)":"−$71B（现金）",
    "25%+ margin":"25%+ 利润率",
    "49% margin":"49% 利润率",
    "n/a (ETF)":"n/a（ETF）",
    "underlying ~14%":"底层约 14%",
    "underlying ~1.8×":"底层约 1.8×",
    "underlying ~22%":"底层约 22%",
    "underlying net cash":"底层净现金",
    "high (small base)":"高（小基数）",
    "CET1 strong":"CET1 强",
    "CET1 14%+":"CET1 14%+",
    "mod":"中等",
    "minimal":"极低",
    "payout":"派息率",
    "TAIWAN SEMICONDUCTOR MANUFACTURING":"台积电",
    "ELI LILLY":"礼来",
    "MICROSOFT":"微软",
    "VISA":"Visa",
    "CONSTELLATION ENERGY":"Constellation Energy",
    "ISHARES U.S. AEROSPACE & DEFENSE ETF · ETF":"iShares 美国航空航天与国防 ETF · ETF",
    "EATON CORP":"Eaton Corp",
    "ARISTA NETWORKS":"Arista Networks",
    "VERTEX PHARMACEUTICALS":"Vertex Pharmaceuticals",
    "VANECK SEMICONDUCTOR ETF · ETF":"VanEck 半导体 ETF · ETF",
    "MALAYAN BANKING BERHAD":"马来亚银行",
    "PUBLIC BANK BERHAD":"大众银行",
    "CIMB GROUP HOLDINGS":"CIMB 集团",
    "IHH HEALTHCARE BERHAD":"IHH Healthcare",
    "TENAGA NASIONAL BERHAD":"国家能源",
    "YTL POWER INTERNATIONAL":"YTL Power International",
    "GAMUDA BERHAD":"Gamuda",
    "NATIONGATE HOLDINGS":"NationGate",
    "VITROX CORPORATION":"ViTrox",
    "SIME DARBY BERHAD":"Sime Darby",
    "PETRONAS DAGANGAN":"Petronas Dagangan",
    "\"Lowest-risk bank in Malaysia at 5% yield — the Berkshire of MY banking.\"":"“马来西亚最低风险银行，股息率 5%：马来西亚银行业的 Berkshire。”",
    "\"Forward30 strategy delivering — record dividend, ROE re-rating sub-9 → 11%+.\"":"“Forward30 策略兑现：纪录股息，ROE 从低于 9% 重估到 11%+。”",
    "\"Aging Asia + medical tourism + 1,000 new beds added FY24 = double-digit ROE by 2026.\"":"“亚洲老龄化 + 医疗旅游 + FY24 新增 1,000 张床 = 2026 年双位数 ROE。”",
    "\"Every Johor DC (Microsoft, AWS, Google, ByteDance, Equinix) pays TENAGA the grid toll.\"":"“每个柔佛数据中心都要向 TENAGA 付电网通行费。”",
    "\"Owns AND operates the Johor DC — vertical bet (land + power + tenancy). 500MW → 1.3GW.\"":"“拥有并运营柔佛数据中心：土地 + 电力 + 租户的垂直押注。500MW → 1.3GW。”",
    "\"RM37bn orderbook, 45-50% DC exposure. Pure-play on ASEAN DC build cycle.\"":"“RM37bn 订单储备，45-50% 数据中心敞口。东盟数据中心建设周期纯打法。”",
    "\"FY24 revenue +720% YoY. The only public-market way to be downstream of NVDA in MY.\"":"“FY24 收入同比 +720%。马股里唯一公开市场方式押注 NVDA 下游。”",
    "\"3D AOI IP moat in semiconductor test. Cycle bottoming as memory + leading-edge logic capex returns.\"":"“半导体测试里的 3D AOI IP 护城河。内存 + 先进逻辑资本开支回归，周期见底。”",
    "\"Diversified conglomerate at 9x P/E with UMW automotive integration tailwind.\"":"“9x P/E 多元集团，背后有 UMW 汽车整合顺风。”",
    "\"18%+ ROE + 4.7% yield from dominant fuel retail. Cash machine.\"":"“主导燃油零售带来 18%+ ROE + 4.7% 股息率。现金机器。”",
    "来源货币: USD. 规则来源: US-source FDAP dividends paid to a nonresident alien are generally subject to 30% withholding. Malaysia is not on the IRS income tax treaty list, so the conservative Malaysia-resident default is 30%.":"来源货币：USD。规则来源：支付给非居民外国人的美国来源 FDAP 股息通常适用 30% 预扣税。马来西亚不在 IRS 所得税协定名单内，所以保守马来西亚居民默认值是 30%。",
    "calcLessonAuto1":"<em>30 年 8%：</em>$1,000/月 → 约 $1.49M。你投入 $360K。",
    "calcLessonAuto2":"<em>多出来的 10 年：</em>多投入 50% 现金，却得到 150% 更多价值。最后 10 年会复利前 20 年。",
    "calcLessonAuto3":"<em>含义：</em>现在开始，胜过等到最优才开始。",
    "calcLessonAuto4":"<em>$500/月 30 年：</em>6% → $500K · 8% → $750K · 10% → $1.13M · 12% → $1.74M",
    "calcLessonAuto5":"<em>多 4% 回报 = 3× 价值。</em>不是多 4%，是三倍。",
    "calcLessonAuto6":"<em>什么会吃掉 4% 回报：</em>1.5% 顾问费 + 1% 基金费用 + 税务损耗 + 行为错误。",
    "calcLessonAuto7":"<em>含义：</em>费用会像回报复利一样，反向对你复利。",
    "calcLessonAuto8":"<em>$50K 起步 + $0/月：</em>8% × 30 年 = $503K。无聊。",
    "calcLessonAuto9":"<em>$0 起步 + $500/月：</em>8% × 30 年 = $745K。超过上面。",
    "calcLessonAuto10":"<em>$50K 起步 + $500/月：</em>8% × 30 年 = $1.25M。组合会复利。",
    "calcLessonAuto11":"<em>含义：</em>真正建立财富的是每月习惯。一次性领先有帮助，但不是决定因素。",
    "calcLessonAuto12":"<em>6%：</em>偏美债 / 偏债券的保守组合。扣通胀后实际约 3%。",
    "calcLessonAuto13":"<em>8%：</em>美国 S&P 500 长期名义平均（1928-2024 约 10%；近十年更高；应预期均值回归）。前瞻规划用 8%。",
    "calcLessonAuto14":"<em>10%：</em>带一点 alpha 的主动股票组合。对没有优势的散户偏乐观。",
    "calcLessonAuto15":"<em>12%+：</em>集中成长 / 个股组合。短窗口可做到，20 年以上很难持续。不要以此做规划。",

    // Codex i18n fifth coverage pass
    "\"Frito-Lay snack moat (~25% margin) cross-subsidises beverage.\"":"“Frito-Lay 零食护城河（约 25% 利润率）反哺饮料业务。”",
    "\"Pharmaceutical + medical devices duopoly post-Kenvue spin (cleaner business).\"":"“Kenvue 拆分后，药品 + 医疗器械双核心，业务更干净。”",
    "\"Beverage portfolio breadth (Coke + Sprite + waters + coffees) protects from category shifts.\"":"“饮料组合够宽，能抵御品类迁移。”",
    "\"NY-NJ regulated utility — ConEd has the most predictable regulated return profile in US utility sector.\"":"“NY-NJ 受监管公用事业，回报曲线在美国公用事业里最可预测。”",
    "\"Consumer staples mega-brand portfolio.\"":"“消费必需品巨型品牌组合。”",
    "\"Duopoly with LOW.\"":"“与 LOW 形成双寡头。”",
    "\"Same housing-age tailwind as HD.\"":"“和 HD 一样享受房龄老化顺风。”",
    "\"Monthly-dividend REIT.\"":"“月度派息 REIT。”",
    "\"Largest publicly-traded BDC.\"":"“最大上市 BDC。”",
    "\"Lower-middle-market BDC + internally managed.\"":"“低中端市场 BDC + 内部管理。”",
    "\"Largest North American midstream pipeline.\"":"“北美最大中游管道。”",
    "\"US largest natural gas pipeline network.\"":"“美国最大天然气管网。”",
    "\"Telco yield play.\"":"“通信股息率打法。”",
    "\"ASEAN bank franchise.\"":"“东盟银行 franchise。”",
    "\"Lowest NPL in MY (sub-0.4%).\"":"“马来西亚最低 NPL（低于 0.4%）。”",
    "\"Monopoly grid utility.\"":"“垄断电网公用事业。”",
    "\"Dominant MY fuel retail.\"":"“马来西亚主导燃油零售。”",
    "\"MY telco yield play.\"":"“马来西亚通信股息率打法。”",
    "\"Diversified MY REIT — retail malls + hotels + offices + medical.\"":"“多元马来西亚 REIT：商场 + 酒店 + 办公 + 医疗。”",
    "\"Pure prime-mall MY REIT — Pavilion KL anchor.\"":"“纯高端商场马来西亚 REIT，以 Pavilion KL 为锚。”",
    "ABBVIE":"AbbVie",
    "PEPSICO":"PepsiCo",
    "JOHNSON & JOHNSON":"Johnson & Johnson",
    "COCA-COLA":"Coca-Cola",
    "CONSOLIDATED EDISON":"Consolidated Edison",
    "PROCTER & GAMBLE":"Procter & Gamble",
    "HOME DEPOT":"Home Depot",
    "LOWE'S":"Lowe's",
    "REALTY INCOME":"Realty Income",
    "ARES CAPITAL":"Ares Capital",
    "MAIN STREET CAPITAL":"Main Street Capital",
    "ENBRIDGE":"Enbridge",
    "KINDER MORGAN":"Kinder Morgan",
    "VERIZON":"Verizon",
    "MALAYAN BANKING · 1155.KL":"马来亚银行 · 1155.KL",
    "PUBLIC BANK · 1295.KL":"大众银行 · 1295.KL",
    "TENAGA NASIONAL · 5347.KL":"国家能源 · 5347.KL",
    "PETRONAS DAGANGAN · 5681.KL":"Petronas Dagangan · 5681.KL",
    "MAXIS BERHAD · 6012.KL":"Maxis · 6012.KL",
    "SUNWAY REIT · 5176.KL":"Sunway REIT · 5176.KL",
    "PAVILION REIT · 5212.KL":"Pavilion REIT · 5212.KL",
    "What's in each issue: portfolio update · 3-5 news cards · 1 deep idea · what changed my mind":"每期内容：组合更新 · 3-5 张新闻卡 · 1 个深想法 · 我改变看法的地方",
    "What's NOT in: tips, alerts, \"act now\", paywalled premium tier. None of that.":"不会有：tips、alerts、“马上行动”、付费高级层。都没有。",

    // Codex i18n fifth attr pass
    "newsRssLi":"RSS feed：/newsletter/feed.xml —— 粘到任何阅读器（Feedly、NetNewsWire、Reeder、Inoreader）",
    "newsGithubLi":"GitHub：关注 repo 的新期号 commit",
    "newsInEachIssueLi":"每期内容：组合更新 · 3-5 张新闻卡 · 1 个深想法 · 我改变看法的地方",
    "newsNotInLi":"不会有：tips、alerts、“马上行动”、付费高级层。都没有。",
    "newsIssueTitleFull":"第 001 期 · 上线：三份研究、一个仪表盘，还有 Leopold 的反手球",

    // Codex i18n footer coverage pass
    "v1 was 18 single-stock picks — closet-indexing. v2 tightens to 10 (8 singles + 2 ETFs). ETFs used where breadth wins (ITA = 6 defense primes, SMH = full semi complex). Singles where the moat is name-specific. 5 parallel research agents, ~120 names screened, quality bar: 5y ROIC > 15%, FCF positive + growing > 10% CAGR, ND/EBITDA < 2.5×.":"v1 是 18 只单股，太像隐形指数化。v2 收紧到 10 个（8 单股 + 2 ETF）。ETF 用在广度更重要的地方（ITA = 6 大国防主承包商，SMH = 完整半导体复合体）。单股只放护城河是名字专属的地方。5 个并行研究代理，筛选约 120 个名字，质量门槛：5 年 ROIC > 15%、FCF 为正且增长 > 10% CAGR、ND/EBITDA < 2.5×。",
    "Theme 1 · AI infra — local research note, not published":"主题 1 · AI 基建 — 本地研究笔记，不发布",
    "Theme 2 · Healthcare — local research note, not published":"主题 2 · 医疗 — 本地研究笔记，不发布",
    "Theme 3 · Defense — local research note, not published":"主题 3 · 国防 — 本地研究笔记，不发布",
    "Theme 4 · Energy — local research note, not published":"主题 4 · 能源 — 本地研究笔记，不发布",
    "Theme 5 · Quality — local research note, not published":"主题 5 · 质量股 — 本地研究笔记，不发布",
    "Same 5-theme framework as the US report, adapted for KLCI + Bursa mid-cap universe. Filter gates: ROE > 10% (banks/utilities OK at 8%+), net debt/EBITDA < 3.5x, durable moat, daily volume > MYR 1M, forward P/E ≤ 18x. Rejected names cited with reason in the source markdown report.":"沿用美国报告的 5 主题框架，但改成 KLCI + Bursa 中盘股票池。筛选门槛：ROE > 10%（银行/公用事业 8%+ 可接受）、净负债/EBITDA < 3.5x、耐久护城河、日成交额 > MYR 1M、远期市盈率 ≤ 18x。被剔除名字和原因都写在源 markdown 报告。",
    "Raw research markdown is local-only, not published on GitHub Pages":"原始研究 markdown 只在本地，不发布到 GitHub Pages",
    "Generated 2026-05-20 · DAINER OS · 1 agent + manual synthesis":"生成于 2026-05-20 · DAINER OS · 1 个代理 + 手动综合",
    "21 picks selected across 3 sleeves. Bar: Sleeve A yield ≥ 2.5% + 5yr DGR > 5%; Sleeve B yield ≥ 5%; Sleeve C yield ≥ 4.5%. All names: payout ratio sustainable, 5yr dividend history (no cuts for Sleeve A), business not melting. ETF shortcut path provided for low-decision-fatigue execution. Tax mechanics now anchor to the conservative Malaysia-resident US withholding rate of 30%.":"21 个标的分布在 3 个篮子。门槛：A 篮子股息率 ≥ 2.5% + 5 年 DGR > 5%；B 篮子股息率 ≥ 5%；C 篮子股息率 ≥ 4.5%。所有名字都要派息率可持续、有 5 年股息历史（A 篮子不能砍过）、业务没有融化。提供 ETF 快捷路径，降低决策疲劳。税务机制锚定马来西亚居民保守美国预扣税率 30%。",
    "Generated 2026-05-20 · DAINER OS":"生成于 2026-05-20 · DAINER OS",

    // Codex i18n famous static pass
    "famousStaticAuto1":"<em>节奏：</em>季度结束后 45 天（2 月 14、5 月 15、8 月 14、11 月 14）",
    "famousStaticAuto2":"<em>包含：</em>股票多头仓位、calls + puts（名义金额）、股数 + 价值",
    "famousStaticAuto3":"<em>不包含：</em>空头、现金、外国股票、固定收益；只有美国 13F 合资格证券",
    "famousStaticAuto4":"<em>来源 URL：</em><code>efts.sec.gov/LATEST/search-index?q=&forms=13F-HR</code>",
    "famousStaticAuto5":"<em>提交者：</em>所有国会议员 + 高级 staff，依据 2012 STOCK Act",
    "famousStaticAuto6":"<em>节奏：</em>交易后 45 天内提交 Periodic Transaction Report",
    "famousStaticAuto7":"<em>包含：</em>ticker、交易日期、买/卖、金额区间（例如 “$1K-$15K”）",
    "famousStaticAuto8":"<em>不包含：</em>精确金额、总持仓（这些只在年度披露里有）",
    "famousStaticAuto9":"<em>来源 URL：</em>capitoltrades.com / quiverquant.com（解析后的 feed）",
    "famousStaticAuto10":"<em>Trump Org (Eric Trump)：</em>私人公司，无 SEC filing。列出是为了诚实，不是因为有数据。",
    "famousStaticAuto11":"<em>Founders Fund (Peter Thiel)：</em>只有部分 13F 覆盖。多数早期持仓是私募。",
    "famousStaticAuto12":"<em>Gates Foundation Trust：</em>提交 13F。Bill Gates 个人 Cascade Investment 是私人。",
    "famousStaticAuto13":"<em>ARK (Cathie Wood)：</em>ETF 发行方每天在 ark-funds.com 发布持仓。",
    "famousStaticAuto14":"<em>滞后 45 天：</em>你看到 Q1 持仓时，基金可能已经轮动。只当方向信号。",
    "famousStaticAuto15":"<em>没有价格细节：</em>13F 只显示期末股数 + 价值。成本未知，你不知道他们是 $50 买还是 $500 买。",
    "famousStaticAuto16":"<em>puts 只有名义金额：</em>看得到名义价值，看不到行权价/到期日。不要直接假设是对冲或方向仓。",
    "famousStaticAuto17":"<em>选择偏差：</em>知名投资人被跟踪，是因为他们有名，不代表他们的风格适合你的情况。",

    // Tax-tool i18n keys (extras the JS adds dynamically)
    'Live FX loaded':'实时汇率已载入',
    'Manual FX / source currency':'手动汇率 / 原币显示',

    // Dashboard-specific exec-card titles
    'Issue #001 · May 20, 2026':'第 001 期 · 2026 年 5 月 20 日',
    'Subscribe — free, weekly':'订阅 — 免费 · 每周',
    'Sunday 8pm AEST, every week':'每周日晚 8 点 (AEST)',

    // Calculator exec-card titles
    'Lesson 1':'第 1 课',
    'Lesson 2':'第 2 课',
    'Lesson 3':'第 3 课',
    'Time beats amount':'时间胜过本金',
    'Return rate is non-linear':'回报率不是线性的',
    'Monthly add matters more than first deposit':'每月投入比首笔金额更重要',
    'Realistic assumptions':'合理假设',
    'What return rate to use':'回报率怎么选',

    // Dashboard nav-card numbers / labels
    'REPORT 001':'研究 001',
    'REPORT 002 · v2':'研究 002 · v2',
    'REPORT 003':'研究 003',
    'REPORT 004':'研究 004',
    'REPORT 005':'研究 005',
    'TOOL':'工具',

    // Common nav-card sub fragments (full nav-card-meta — already covered above)
    // Compound calculator hero kickers
    '⊕ DAINER FINANCE · COMPOUND CALCULATOR':'⊕ DAINER FINANCE · 复利计算器',
    '01 · Run the math':'01 · 运行计算',
    '02 · What the numbers say':'02 · 数字背后的逻辑',
    'The three lessons':'三个教训',

    // Newsletter
    'Subscribe':'订阅',
    'All issues':'所有期号',
    'The archive':'存档',
    'Newsletter · weekly · free':'周报 · 每周 · 免费',
    'Issued Sunday 8pm AEST':'每周日晚 8 点（AEST）发行',
    'About the newsletter':'关于本周报',
    'Latest issue':'最新一期'
  }
};

function currentLanguage(){
  try{
    return localStorage.getItem('dainer-finance-lang') || 'en';
  }catch(_){
    return 'en';
  }
}

function setLanguage(lang){
  const next = lang === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
  try{ localStorage.setItem('dainer-finance-lang', next); }catch(_){}
  applyLanguage(next);
  document.dispatchEvent(new CustomEvent('dainer:languagechange', { detail:{ lang:next } }));
}

function toggleLanguage(){
  setLanguage(currentLanguage() === 'zh' ? 'en' : 'zh');
}

function translateHtmlElement(el, lang){
  if (!el.dataset.i18nEn) el.dataset.i18nEn = el.innerHTML;
  const key = el.getAttribute('data-i18n');
  if (lang === 'zh' && I18N.zh[key]) el.innerHTML = I18N.zh[key];
  else el.innerHTML = el.dataset.i18nEn;
}

function translateExactText(el, lang){
  if (!el || el.childNodes.length !== 1 || el.childNodes[0].nodeType !== Node.TEXT_NODE) return;
  if (!el.dataset.i18nOriginalText) el.dataset.i18nOriginalText = el.textContent.trim();
  const original = el.dataset.i18nOriginalText;
  el.textContent = lang === 'zh' && I18N.zh[original] ? I18N.zh[original] : original;
}

function applyLanguage(lang){
  document.querySelectorAll('[data-i18n]').forEach(el => translateHtmlElement(el, lang));
  // Broadened selector — covers structural labels across all pages
  const labelSelector = [
    '.mission a',
    '.preset-buttons button',
    '.calc-result-label',
    '.calc-stat-label',
    '.chart-legend span',
    '.calc-input label',
    '.hero-tag',                       // ⊕ DAINER FINANCE · ...
    '.hero-panel-label',               // SINGLE LARGEST CONVICTION
    '.hero-panel-head span',           // // CORE READOUT, LIVE
    '.hero-panel-grid div span',       // REPORTS / 5 active / etc.
    '.sec-tag',                        // // PROBE 01 · ...
    '.sec-tag-tail',                   // 5 ACTIVE · STATUS GREEN
    '.waypoint-label',                 // Active reports
    '.waypoint-sub',                   // // across all sleeves
    '.risk-num',                       // RISK 01
    '.risk-head',                      // Taiwan kinetic event
    '.exec-card h4',                   // Leg-in plan
    '.exec-card h3',                   // 50 / 25 / 25 across 6 weeks
    '.footer h4',                      // About, Site map, Connect
    '.news-link',                      // VIEW SOURCE
    '.nav-card-meta',                  // 10 picks · 5 themes · ...
    '.status-tag',                     // STATUS: VERIFIED · ...
    '.fx-status',                      // Live FX loaded / Manual FX
    '.hero-meta-top span',             // page metadata chips
    '.hero-panel-sub',                 // allocation readout subcopy
    '.nav-card-num',
    '.nav-card-title',
    '.nav-card-sub',
    '.section-label',
    '.section-title',
    '.section-sub',
    '.theme-num',
    '.theme-name',
    '.theme-alloc',
    '.theme-meta',
    '.pf-stat-label',
    '.pf-stat-sub',
    '.filter-btn',
    '.issue-title',
    '.issue-meta',
    '.exec-card li',
    '.exec-card p',
    '.risk-body',
    '.trader-cat',
    '.trader-tagline',
    '.trader-meta span:first-child',
    '.trader-detail h4',
    '.trader-side-row span:first-child',
    '.pick-metric span:first-child',
    '.pick-detail h4',
    '.pick-side-row span:first-child',
    '.pick-expand-cue',
    '.trader-expand-cue',
    '.loading',
    '.pick-hook',
    '.pick-layer',
    '.news-head',
    '.news-text',
    '.tax-notes p',
    '.footer a',
    '.footer li span',
    '.footer p',
    '.pos-change',
    '.trader-fund',
    '.pick-name',
    '.pick-rank',
    '.pick-theme',
    '.pick-alloc',
    '.pick-metric span:last-child',
    '.pick-id span',
    '.pick-id em',
    '.issue-row li'
  ].join(', ');
  document.querySelectorAll(labelSelector).forEach(el => {
    if (!el.hasAttribute('data-i18n')) translateExactText(el, lang);
  });
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN' : '中文';
}

function setupLanguageToggle(){
  if (document.getElementById('lang-toggle')) return;
  const navRight = document.querySelector('.mission > .mission-cells:last-child');
  if (!navRight) return;
  const btn = document.createElement('button');
  btn.id = 'lang-toggle';
  btn.className = 'theme-btn lang-btn';
  btn.type = 'button';
  btn.onclick = toggleLanguage;
  navRight.appendChild(btn);
  setLanguage(currentLanguage());
}

// Number count-up
function animateCount(el){
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const dur = 1200;
  const start = performance.now();
  const tick = t => {
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = target * eased;
    el.textContent = v.toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Scroll reveal observer
function setupReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        e.target.querySelectorAll('.count').forEach(c => {
          if (!c.dataset.counted){
            c.dataset.counted = '1';
            animateCount(c);
          }
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

// Mission strip — SOL counter (ticks every minute, gives "mission day passing" feel)
let sol = 1247;
function tickSol(){
  sol++;
  document.querySelectorAll('[data-sol]').forEach(el => el.textContent = sol);
}
setInterval(tickSol, 60000);

// Runtime — counts up from page load with base offset
const startTime = Date.now() - (2*3600 + 47*60 + 11)*1000;
function tickRuntime(){
  const ms = Date.now() - startTime;
  const h = Math.floor(ms/3600000);
  const m = Math.floor((ms%3600000)/60000);
  const s = Math.floor((ms%60000)/1000);
  const str = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.querySelectorAll('[data-runtime]').forEach(el => el.textContent = str);
}
setInterval(tickRuntime, 1000);

// Cursor coordinate marker — auto-injects if not present (dark mode only via CSS)
function setupCursorMark(){
  if (document.getElementById('cursor-mark')) return;
  const mark = document.createElement('div');
  mark.id = 'cursor-mark';
  mark.className = 'cursor-mark';
  const coord = document.createElement('div');
  coord.id = 'cursor-coord';
  coord.className = 'cursor-coord';
  coord.textContent = '47.123°N · 03.218°W';
  document.body.appendChild(mark);
  document.body.appendChild(coord);
  document.addEventListener('mousemove', (e) => {
    mark.style.left = e.clientX + 'px';
    mark.style.top = e.clientY + 'px';
    coord.style.left = e.clientX + 'px';
    coord.style.top = e.clientY + 'px';
    const lat = (47.123 + (e.clientY / window.innerHeight - 0.5) * 0.02).toFixed(3);
    const lng = (3.218 + (e.clientX / window.innerWidth - 0.5) * 0.04).toFixed(3);
    coord.textContent = `${lat}°N · ${lng}°W`;
  });
}

// Detect relative path to assets/ — '' from root, '../' from picks/ + newsletter/
function assetPath(name){
  const p = window.location.pathname;
  const inSubdir = /\/(picks|newsletter|mockup)\//.test(p);
  return (inSubdir ? '../' : '') + 'assets/' + name;
}

function ensureFavicon(){
  if (document.querySelector('link[rel~="icon"]')) return;
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/svg+xml';
  icon.href = assetPath('favicon.svg');
  document.head.appendChild(icon);
}

// Inject Mars-horizon backdrop layers + sandstorm video if missing (so every page has them)
function injectBackdrop(){
  if (document.querySelector('.horizon')) return;
  // 6 ambient layers (gradient sky, ridges, haze, grain, grid)
  const layers = ['horizon','ridge far','ridge','haze','grain','bg-grid'];
  layers.forEach(cls => {
    const el = document.createElement('div');
    el.className = cls;
    document.body.insertBefore(el, document.body.firstChild);
  });
  // Static Mars photo sits behind the video and remains visible for reduced motion.
  if (!document.querySelector('.mars-hero-bg')){
    const bg = document.createElement('div');
    bg.className = 'mars-hero-bg';
    bg.setAttribute('aria-hidden','true');
    document.body.insertBefore(bg, document.body.firstChild);
  }
  // Mars sandstorm VIDEO on every page (auto-injected) with photo as poster fallback
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && !document.querySelector('.mars-hero-video')){
    const v = document.createElement('video');
    v.className = 'mars-hero-video';
    v.src = assetPath('mars-sandstorm.webm');
    v.poster = assetPath('mars-horizon.jpg');
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.setAttribute('autoplay','');
    v.setAttribute('loop','');
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    v.setAttribute('aria-hidden','true');
    document.body.insertBefore(v, document.body.firstChild);
    v.play().catch(e => console.warn('Mars sandstorm autoplay blocked:', e));
  }
}

// Mark active nav link based on current path
function setupActiveNav(){
  const path = window.location.pathname;
  document.querySelectorAll('.mission-cells a, .nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href === '#') return;
    if (path.endsWith(href.replace(/^\.+\//, '/')) || path.endsWith(href)) {
      a.classList.add('active');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  ensureFavicon();
  injectBackdrop();
  setupLanguageToggle();
  setupCursorMark();
  setupReveal();
  setupActiveNav();
  tickRuntime();
  // Immediate counters for above-fold cards
  [500, 1200, 2500].forEach(delay => setTimeout(() => applyLanguage(currentLanguage()), delay));
  setTimeout(() => {
    document.querySelectorAll('.above-fold').forEach(el => {
      el.classList.add('visible');
      el.querySelectorAll('.count').forEach(c => {
        if (!c.dataset.counted){ c.dataset.counted='1'; animateCount(c); }
      });
    });
  }, 300);
});
