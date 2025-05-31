
export interface ChatResponse {
  keywords: string[];
  response: string;
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ['quadratic', 'x²', 'x^2', 'ax²+bx+c'],
    response: `Let me help you solve quadratic equations! 

**Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a**

For example, let's solve x² + 5x + 6 = 0:
1. Identify: a = 1, b = 5, c = 6
2. Calculate discriminant: b² - 4ac = 25 - 24 = 1
3. Apply formula: x = (-5 ± √1) / 2 = (-5 ± 1) / 2
4. Solutions: x = -2 or x = -3

**Alternative - Factoring:**
x² + 5x + 6 = (x + 2)(x + 3) = 0
So x = -2 or x = -3`
  },
  {
    keywords: ['pythagorean', 'right triangle', 'a²+b²=c²', 'hypotenuse'],
    response: `The Pythagorean theorem is fundamental in geometry!

**Formula: a² + b² = c²**
Where c is the hypotenuse (longest side)

**Example:**
If a = 3 and b = 4, find c:
- 3² + 4² = c²
- 9 + 16 = c²
- 25 = c²
- c = 5

**Common Pythagorean triples:**
- 3-4-5
- 5-12-13
- 8-15-17
- 7-24-25`
  },
  {
    keywords: ['derivative', 'differentiation', 'f\'(x)', 'dx'],
    response: `Derivatives measure the rate of change!

**Power Rule: d/dx[xⁿ] = nxⁿ⁻¹**

**Example: f(x) = 3x³ + 2x² - 5x + 1**
- d/dx[3x³] = 9x²
- d/dx[2x²] = 4x  
- d/dx[-5x] = -5
- d/dx[1] = 0

**Result: f'(x) = 9x² + 4x - 5**

**Other rules:**
- Sum rule: (f + g)' = f' + g'
- Product rule: (fg)' = f'g + fg'
- Chain rule: (f(g(x)))' = f'(g(x)) × g'(x)`
  },
  {
    keywords: ['fraction', 'numerator', 'denominator', 'simplify'],
    response: `Working with fractions step by step:

**Adding fractions:**
1. Find common denominator
2. Convert fractions
3. Add numerators
Example: 1/3 + 1/4 = 4/12 + 3/12 = 7/12

**Multiplying fractions:**
Multiply numerators and denominators
Example: 2/3 × 3/4 = 6/12 = 1/2

**Simplifying:**
Find GCD of numerator and denominator
Example: 12/18 = 12÷6/18÷6 = 2/3`
  },
  {
    keywords: ['percentage', 'percent', '%'],
    response: `Percentage calculations made easy!

**Converting:**
- Fraction to %: multiply by 100
- % to decimal: divide by 100
- % to fraction: put over 100 and simplify

**Finding percentage of a number:**
25% of 80 = 0.25 × 80 = 20

**Finding what % one number is of another:**
15 is what % of 60?
(15 ÷ 60) × 100 = 25%

**Percentage increase/decrease:**
Original: 50, New: 60
Increase = (60-50)/50 × 100 = 20%`
  },
  {
    keywords: ['area', 'perimeter', 'volume', 'circle', 'triangle', 'rectangle'],
    response: `Geometry formulas at your fingertips!

**Area formulas:**
- Rectangle: length × width
- Triangle: (1/2) × base × height
- Circle: πr²
- Square: side²

**Perimeter formulas:**
- Rectangle: 2(length + width)
- Triangle: sum of all sides
- Circle (circumference): 2πr
- Square: 4 × side

**Volume formulas:**
- Cube: side³
- Rectangular prism: length × width × height
- Cylinder: πr²h
- Sphere: (4/3)πr³`
  },
  {
    keywords: ['linear equation', 'solve for x', 'isolate', 'variable'],
    response: `Solving linear equations step by step:

**General approach:**
1. Simplify both sides
2. Move variables to one side
3. Move constants to other side
4. Divide by coefficient

**Example: 3x + 7 = 22**
1. Subtract 7: 3x = 15
2. Divide by 3: x = 5

**Example: 2(x - 3) = 10**
1. Distribute: 2x - 6 = 10
2. Add 6: 2x = 16
3. Divide by 2: x = 8

Remember: Whatever you do to one side, do to the other!`
  },
  {
    keywords: ['sin', 'cos', 'tan', 'trigonometry', 'angle'],
    response: `Trigonometric ratios in right triangles:

**SOHCAHTOA:**
- **S**in = **O**pposite / **H**ypotenuse
- **C**os = **A**djacent / **H**ypotenuse  
- **T**an = **O**pposite / **A**djacent

**Special angles:**
- sin(30°) = 1/2, cos(30°) = √3/2
- sin(45°) = √2/2, cos(45°) = √2/2
- sin(60°) = √3/2, cos(60°) = 1/2

**Example:**
In a right triangle with opposite = 4, adjacent = 3:
- Hypotenuse = √(4² + 3²) = 5
- sin θ = 4/5 = 0.8
- cos θ = 3/5 = 0.6
- tan θ = 4/3 ≈ 1.33`
  }
];

export const getChatResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  for (const response of chatResponses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
      return response.response;
    }
  }
  
  return `I'd be happy to help with that math concept! Here are some topics I can assist with:

📐 **Geometry** - Area, perimeter, volume, Pythagorean theorem
📊 **Algebra** - Linear equations, quadratic equations, factoring
📈 **Calculus** - Derivatives, integrals, limits
🔢 **Arithmetic** - Fractions, percentages, basic operations
📐 **Trigonometry** - Sin, cos, tan, angle calculations

Try asking about any of these topics, or paste a specific problem you'd like help with!`;
};
