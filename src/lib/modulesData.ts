export interface ModuleData {
  id: string;
  title: string;
  subtitle: string;
  briefing: string;
  score: number;
  status: 'Open' | 'Conditional' | 'Restricted' | 'Stable' | 'Elevated' | 'Crisis';
  trend: 'up' | 'down' | 'stable';
  layers: {
    name: string;
    score: number;
    description: string;
  }[];
  example: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export const modules: Record<string, ModuleData> = {
  '01': {
    id: '01',
    title: 'Economic Posture & Entry Signal',
    subtitle: 'Macro Intelligence Layer',
    briefing: 'Nigeria enters Q1 2026 with an Economic Posture score of 54/100 — structurally open but cyclically constrained. The entry signal is CONDITIONAL: macro fundamentals are stabilising post-devaluation, but regulatory unpredictability and FX friction remain elevated.',
    score: 54,
    status: 'Conditional',
    trend: 'up',
    layers: [
      { name: 'Structural Posture', score: 62, description: 'Long-run orientation toward investment and trade openness.' },
      { name: 'Cyclical Posture', score: 46, description: 'Current conditions and short-term macro variables.' }
    ],
    example: 'Recommended entry sectors: agribusiness, digital infrastructure. Avoid: import-dependent manufacturing.',
    sections: [
      {
        title: 'What it focuses on',
        content: 'This module establishes the baseline economic character of a country — its structural orientation toward investment, the direction of travel of key macro variables, and the quality of the entry environment for foreign capital. It answers the first question any country committee asks: is this economy fundamentally open for business right now?'
      }
    ]
  },
  '02': {
    id: '02',
    title: 'Price Stability & Monetary Pressure',
    subtitle: 'Macro Intelligence Layer',
    briefing: 'Headline CPI remains elevated at 34.2%, with food inflation at 39.8%. Monetary response is lagging pressure, indicating a high stress gap and potential for emergency rate action within 90 days.',
    score: 78,
    status: 'Elevated',
    trend: 'up',
    layers: [
      { name: 'Macro Inflation', score: 82, description: 'Headline and core CPI, food price dynamics.' },
      { name: 'Household Transmission', score: 78, description: 'Ground-level experience: fuel, food basket, rent.' },
      { name: 'Monetary Response', score: 61, description: 'Central bank rate decisions and forward guidance.' }
    ],
    example: 'Stress gap: 17 points. Historically a precursor to FX intervention or emergency rate hikes.',
    sections: [
      {
        title: 'Unified Pressure Monitor',
        content: 'Combines inflation stress, cost-of-living transmission, and monetary policy tightness. The critical value is in the relationship between these three sub-layers.'
      }
    ]
  },
  '03': {
    id: '03',
    title: 'FX Liquidity & Capital Flows',
    subtitle: 'Macro Intelligence Layer',
    briefing: 'Parallel market premium has narrowed to 4.2%, but repatriation difficulty remains high at 66/100. Net capital outflows persist for the third consecutive month.',
    score: 66,
    status: 'Elevated',
    trend: 'down',
    layers: [
      { name: 'FX Liquidity', score: 45, description: 'NAFEM depth and daily turnover signals.' },
      { name: 'Parallel Premium', score: 92, description: 'Convergence between official and parallel markets.' },
      { name: 'Repatriation Risk', score: 34, description: 'Difficulty scoring for capital convertibility.' }
    ],
    example: 'Pattern match to 2016 crisis: 58% similarity. Monitoring flag active.',
    sections: [
      {
        title: 'Integrated FX Engine',
        content: 'Consolidates external balance, capital flow dynamics, and convertibility. Maintains a database of past Nigerian FX crisis events for pattern matching.'
      }
    ]
  },
  '04': {
    id: '04',
    title: 'Systemic Transmission & Solvency',
    subtitle: 'Macro Intelligence Layer',
    briefing: 'Sub-national fiscal stress is beginning to transmit into the banking sector. Two tier-2 banks are showing elevated NPL risks due to state-level salary payment delays.',
    score: 42,
    status: 'Elevated',
    trend: 'down',
    layers: [
      { name: 'Banking Health', score: 58, description: 'NPL ratios, CAR compliance, and liquidity stress.' },
      { name: 'Fiscal Solvency', score: 38, description: 'Debt service ratios and state-level salary performance.' }
    ],
    example: 'Kaduna State salary delays flag NGN 4.2bn in salary-backed loans at risk.',
    sections: [
      {
        title: 'Interdependence Model',
        content: 'Tracks the health of Nigeria\'s banking sector and fiscal solvency as an integrated system. State fiscal collapse transmits into banking stress.'
      }
    ]
  },
  '05': {
    id: '05',
    title: 'Commodity Exposure & Trade',
    subtitle: 'Macro Intelligence Layer',
    briefing: 'Brent crude at $74/barrel sits below Nigeria\'s fiscal breakeven of $81. Revenue shortfall estimated at $315mn per month at current production levels.',
    score: 48,
    status: 'Elevated',
    trend: 'stable',
    layers: [
      { name: 'Fiscal Breakeven', score: 42, description: 'Brent price against the $81 breakeven line.' },
      { name: 'Trade Exposure', score: 55, description: 'Import dependency and current account vulnerability.' },
      { name: 'Agri-Commodity', score: 64, description: 'Cocoa cycles and input cost inflation.' }
    ],
    example: 'Revenue shortfall triggers 72% probability of supplementary budget.',
    sections: [
      {
        title: 'Volatility Context',
        content: 'Tracks Nigeria\'s structural exposure to commodity price cycles and their transmission into fiscal revenue and FX earnings.'
      }
    ]
  },
  '06': {
    id: '06',
    title: 'State Investment Readiness',
    subtitle: 'Sub-National Intelligence Layer',
    briefing: 'Lagos (74/100) and Ogun (68/100) lead the federation in investment readiness. Governance consistency remains the primary differentiator across the 36 states.',
    score: 74,
    status: 'Stable',
    trend: 'up',
    layers: [
      { name: 'Fiscal Behavior', score: 82, description: 'Budget execution and IGR growth.' },
      { name: 'Policy Consistency', score: 75, description: 'Regulatory environment and stability.' },
      { name: 'Infrastructure', score: 65, description: 'Operational enablement and utilities.' }
    ],
    example: 'Lagos leads due to strong fiscal execution; Rivers penalised by governance inconsistency.',
    sections: [
      {
        title: 'Action Over Rhetoric',
        content: 'A proprietary index measuring what a state does, not what it says. Resistant to political spin and useful for PE/VC due diligence.'
      }
    ]
  },
  '07': {
    id: '07',
    title: 'Sector Opportunity Mapping',
    subtitle: 'Sub-National Intelligence Layer',
    briefing: 'Poultry processing in Plateau State shows a high opportunity score (79/100) due to supply chain proximity and lower input costs compared to Lagos.',
    score: 79,
    status: 'Open',
    trend: 'up',
    layers: [
      { name: 'Geospatial Potential', score: 85, description: 'Land use and resource distribution.' },
      { name: 'Supply Chain Diagnostic', score: 74, description: 'Input availability and logistics cost.' },
      { name: 'Demand Indicators', score: 78, description: 'Population density and income distribution.' }
    ],
    example: 'Plateau poultry processing: 18% lower input costs than Lagos equivalents.',
    sections: [
      {
        title: 'Quantified Potential',
        content: 'Identifies genuine investment opportunities using geospatial mapping, infrastructure proximity, and supply chain diagnostics.'
      }
    ]
  },
  '08': {
    id: '08',
    title: 'Operational Viability Index',
    subtitle: 'Sub-National Intelligence Layer',
    briefing: 'Power reliability remains the critical constraint. Ogun State (71/100) offers the best balance of grid availability and logistics proximity for manufacturing.',
    score: 71,
    status: 'Stable',
    trend: 'stable',
    layers: [
      { name: 'Power Reliability', score: 62, description: 'Grid availability and diesel dependency.' },
      { name: 'Logistics Quality', score: 78, description: 'Road condition and freight cost.' },
      { name: 'Security of Ops', score: 54, description: 'Asset protection and personnel risk.' }
    ],
    example: 'Ogun recommended for export-oriented ops; Kaduna for domestic supply.',
    sections: [
      {
        title: 'Execution Efficiency',
        content: 'Structured intelligence on the ease, cost, and reliability of moving goods, services, and personnel across Nigeria.'
      }
    ]
  },
  '09': {
    id: '09',
    title: 'Operating Environment Assessment',
    subtitle: 'Synthesis & Foresight Layer',
    briefing: 'Fintech regulatory reliability is declining (58/100) due to frequent CBN directive reversals. Workforce quality in Lagos remains a strong offset at 74/100.',
    score: 58,
    status: 'Conditional',
    trend: 'down',
    layers: [
      { name: 'Regulatory Stability', score: 45, description: 'Policy consistency and enforcement trends.' },
      { name: 'Workforce Quality', score: 74, description: 'Skill availability and industrial relations.' }
    ],
    example: 'Fintech: build 15% regulatory risk buffer into operating models.',
    sections: [
      {
        title: 'Model Reliability',
        content: 'Combines regulatory stability monitoring with workforce intelligence to determine if a business model holds.'
      }
    ]
  },
  '10': {
    id: '10',
    title: 'Forward Outlook & Scenarios',
    subtitle: 'Synthesis & Foresight Layer',
    briefing: 'Base case (55% probability): gradual FX stabilisation and inflation decline. Stress case (32% probability): oil price decline triggers fiscal pressure.',
    score: 55,
    status: 'Stable',
    trend: 'stable',
    layers: [
      { name: 'Base Case Prob', score: 55, description: 'Most probable path given current signals.' },
      { name: 'Stress Case Prob', score: 32, description: 'Plausible deterioration scenario.' },
      { name: 'Tail Risk Prob', score: 13, description: 'Low-probability, high-impact disruption.' }
    ],
    example: 'Sector most exposed under stress: import-dependent FMCG.',
    sections: [
      {
        title: 'Structured Foresight',
        content: 'Draws on all nine preceding modules to produce probability-weighted scenarios at 6, 12, and 24-month horizons.'
      }
    ]
  }
};
