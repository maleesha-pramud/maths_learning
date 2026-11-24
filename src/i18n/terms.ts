export interface Term { si: string; en: string; tex?: string }

export const terms: Term[] = [
  { si: 'කලනය', en: 'Calculus' },
  { si: 'අවකලනය', en: 'Differentiation' },
  { si: 'ව්‍යුත්පන්නය', en: 'Derivative', tex: "f'(x)=\\frac{dy}{dx}" },
  { si: 'බෑවුම', en: 'Slope / Gradient', tex: 'm=\\frac{\\Delta y}{\\Delta x}' },
  { si: 'ඡේදකය', en: 'Secant line' },
  { si: 'ස්පර්ශකය', en: 'Tangent line' },
  { si: 'සීමාව', en: 'Limit', tex: '\\lim_{h\\to0}' },
  { si: 'බල නීතිය', en: 'Power rule', tex: '(x^n)\'=nx^{n-1}' },
  { si: 'දාම නීතිය', en: 'Chain rule', tex: "(f(g))'=f'(g)g'" },
  { si: 'ව්‍යංග්‍ය අවකලනය', en: 'Implicit differentiation' },
  { si: 'අනුකලනය', en: 'Integration', tex: '\\int f(x)\\,dx' },
  { si: 'ප්‍රතිව්‍යුත්පන්නය', en: 'Antiderivative' },
  { si: 'නියතය (අනුකල නියතය)', en: 'Constant of integration', tex: '+C' },
  { si: 'අනිශ්චිත අනුකලය', en: 'Indefinite integral' },
  { si: 'නිශ්චිත අනුකලය', en: 'Definite integral', tex: '\\int_a^b f\\,dx=F(b)-F(a)' },
  { si: 'ලවය', en: 'Numerator' },
  { si: 'හරය', en: 'Denominator' },
  { si: 'භාග බෙදීම', en: 'Partial fractions', tex: '\\frac{A}{x-a}+\\frac{B}{x-b}' },
  { si: 'වර්ගඵලය', en: 'Area' },
  { si: 'ශ්‍රිතය', en: 'Function', tex: 'f(x)' },
]
