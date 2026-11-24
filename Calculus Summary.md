# Calculus Summary — Mathematics for Computer Science II

Source: lecture slides by Dinusha Gunarathna (Topics 3 and 4 of the course: Differential Calculus and Integral Calculus).

> Note: many formulas and worked examples in the slides are embedded as images, so the text layer only carries titles and bullet text. Where a slide's formula wasn't readable, the standard result for that topic is filled in.

---

## Part A — Differential Calculus

### 1. Big picture
- **Calculus** studies change, motion and accumulation. It has two halves:
  - **Differential calculus** studies rates of change. Its main concept is the **derivative**.
  - **Integral calculus** studies accumulation. Its main concept is the **integral**.
- History: Newton (1665, "fluxions") and Leibniz (1675, the dx / ∫ notation) developed it independently.
- Applications: velocity and acceleration, marginal cost and revenue, growth rates, battery charge rates, and **gradients for optimization in machine learning**.

### 2. Definition of the derivative
- Differentiation is the process of finding the derivative.
- The derivative gives the rate of change of y with respect to x. Geometrically, it is the **slope of the tangent line** to the curve at a point.
- Definition (the limit of the slope of secant lines):

  f′(x) = lim_{h→0} [ f(x+h) − f(x) ] / h

- Examples worked from the definition include a simple function and x³ (which gives 3x²).

### 3. Basic differentiation rules
| Rule | Formula |
|---|---|
| Constant | d/dx (c) = 0 |
| Power | d/dx (xⁿ) = n·xⁿ⁻¹ |
| Constant multiple | d/dx (c·f) = c·f′ |
| Sum | (f + g)′ = f′ + g′ |
| Difference | (f − g)′ = f′ − g′ |

### 4. Trigonometric derivatives
The slides derive sin x, cos x and tan x from the definition, then give the full table:

| f(x) | f′(x) |
|---|---|
| sin x | cos x |
| cos x | −sin x |
| tan x | sec² x |
| cot x | −csc² x |
| sec x | sec x tan x |
| csc x | −csc x cot x |

### 5. Implicit differentiation
- Used when y is not written explicitly as a function of x (for example x² + y² = 25).
- Differentiate both sides with respect to x. **Whenever you differentiate a term in y, multiply by dy/dx** (this is the chain rule applied to y). Then solve for dy/dx.
- The slides give five worked examples.

### 6. Chain rule
- Used when one function sits inside another: y = f(g(x)).
- **dy/dx = f′(g(x)) · g′(x)**, which is "derivative of the outside (inner function kept) × derivative of the inside".
- Steps: identify the inner and outer functions, differentiate the outer, differentiate the inner, multiply.
- Trig example: d/dx sin(g(x)) = cos(g(x)) · g′(x).

---

## Part B — Integral Calculus

### 1. Integration as reverse differentiation
- Integration is the reverse of differentiation. Uses include areas, distances, accumulated quantities, and problems in science, engineering, economics and statistics.
- Notation: in ∫ f(x) dx, ∫ is the integral sign, f(x) is the integrand, and **dx** says we integrate with respect to x.
- Example: since d/dx(x²) = 2x, we have ∫ 2x dx = x² + C.

### 2. Indefinite integrals and the constant C
- An indefinite integral has no limits and is the family of **all antiderivatives**.
- **C**, the constant of integration, is needed because constants vanish on differentiation: x², x² + 5 and x² − 10 all have derivative 2x.
- Key fact: any two antiderivatives of a function on an interval differ by a constant.

### 3. Basic rules
| Rule | Formula |
|---|---|
| Power rule | ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, for n ≠ −1 |
| Constant | ∫ k dx = kx + C |
| Constant multiple | ∫ a·f(x) dx = a ∫ f(x) dx |
| Sum / polynomial | integrate term by term |

- Power rule method: add 1 to the power, divide by the new power, add C.
- Example: ∫ (3x² + 4x + 5) dx = x³ + 2x² + 5x + C.
- The slides include 20-question practice sets on the power rule, constants, constant multiples and polynomials.

### 4. Standard forms
The slides give a table of standard integrals, with practice on exponentials, sine and cosine. The usual results are:
- ∫ eˣ dx = eˣ + C
- ∫ sin x dx = −cos x + C
- ∫ cos x dx = sin x + C
- ∫ 1/x dx = ln|x| + C (the n = −1 case the power rule excludes)

### 5. Definite integrals
| | Indefinite | Definite |
|---|---|---|
| Limits | none | ∫ₐᵇ (lower a, upper b) |
| Result | a function + C | a **number** |
| C | required | cancels, so it is not needed |

- **Fundamental Theorem of Calculus (second version):** if F′ = f, then

  ∫ₐᵇ f(x) dx = F(b) − F(a)

- Uses: area under a curve, accumulated quantities, distance from velocity, total change in a quantity.
- Basic properties (standard): ∫ₐᵃ f = 0; ∫ₐᵇ f = −∫ᵇₐ f; ∫ₐᵇ (f ± g) = ∫ₐᵇ f ± ∫ₐᵇ g; ∫ₐᵇ k·f = k ∫ₐᵇ f; ∫ₐᵇ f = ∫ₐᶜ f + ∫ᶜᵇ f.

### 6. Rational functions (numerator ÷ denominator)
- **Numerator is the derivative of the denominator:**

  ∫ f′(x)/f(x) dx = ln|f(x)| + C

- **Numerator is a constant multiple of the denominator's derivative:** factor out the constant, then apply the same rule.
- Example: ∫ 2x/(x²+1) dx = ln(x²+1) + C.

### 7. Partial fractions
- Method: split a complicated rational expression into simpler fractions, then integrate each separately.
- Basic case, **two distinct linear factors**:

  1/((x−a)(x−b)) = A/(x−a) + B/(x−b)

  Find A and B by matching coefficients or substituting convenient x values. Each piece integrates to a log term.
- The slides finish with a definite-integral example using this method.

---

## Quick revision cheat-sheet
- **Derivative** = slope of tangent = instantaneous rate of change = limit of the difference quotient.
- **Rules**: constant → 0, power → bring down and subtract 1, and linearity (sum, difference, constant multiple).
- **Chain rule**: outer′(inner) × inner′. **Implicit**: attach dy/dx to every y-term.
- **Integral** = reverse of derivative. Always add **+ C** for indefinite integrals.
- **Definite integral** = F(b) − F(a), giving area or total accumulation.
- For f′/f use **ln|f|**. For a rational function with distinct linear factors use **partial fractions**.
