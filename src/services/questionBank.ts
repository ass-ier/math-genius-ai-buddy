
export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  explanation: string;
  hints: string[];
  difficulty: number;
  topic: string;
  subtopic: string;
}

export const questionBank: Question[] = [
  // Arithmetic - Beginner
  {
    id: 'arith_1_1',
    question: 'What is 15 + 27?',
    correct_answer: '42',
    explanation: 'Add the numbers: 15 + 27 = 42',
    hints: ['Line up the digits', 'Add from right to left'],
    difficulty: 1,
    topic: 'arithmetic',
    subtopic: 'addition'
  },
  {
    id: 'arith_1_2',
    question: 'Calculate 84 - 29',
    correct_answer: '55',
    explanation: 'Subtract: 84 - 29 = 55',
    hints: ['Borrow from the tens place if needed', 'Work from right to left'],
    difficulty: 1,
    topic: 'arithmetic',
    subtopic: 'subtraction'
  },
  {
    id: 'arith_1_3',
    question: 'What is 3/4 as a decimal?',
    correct_answer: '0.75',
    explanation: 'Divide 3 by 4: 3 ÷ 4 = 0.75',
    hints: ['Divide the numerator by denominator', '3 ÷ 4 = ?'],
    difficulty: 1,
    topic: 'arithmetic',
    subtopic: 'decimals'
  },
  
  // Arithmetic - Intermediate
  {
    id: 'arith_2_1',
    question: 'Calculate 156 × 23',
    correct_answer: '3588',
    explanation: 'Multiply: 156 × 23 = 3588',
    hints: ['Break it down: 156 × 20 + 156 × 3', 'Use the distributive property'],
    difficulty: 2,
    topic: 'arithmetic',
    subtopic: 'multiplication'
  },
  {
    id: 'arith_2_2',
    question: 'What is 25% of 240?',
    correct_answer: '60',
    explanation: '25% = 1/4, so 240 ÷ 4 = 60',
    hints: ['25% means 25 out of 100', 'Convert to fraction: 25/100 = 1/4'],
    difficulty: 2,
    topic: 'arithmetic',
    subtopic: 'percentages'
  },

  // Algebra - Beginner
  {
    id: 'alg_1_1',
    question: 'Solve for x: x + 7 = 12',
    correct_answer: '5',
    explanation: 'Subtract 7 from both sides: x = 12 - 7 = 5',
    hints: ['Isolate x by subtracting 7', 'What number plus 7 equals 12?'],
    difficulty: 1,
    topic: 'algebra',
    subtopic: 'linear_equations'
  },
  {
    id: 'alg_1_2',
    question: 'Simplify: 3x + 5x',
    correct_answer: '8x',
    explanation: 'Combine like terms: 3x + 5x = (3 + 5)x = 8x',
    hints: ['Add the coefficients', 'Keep the variable the same'],
    difficulty: 1,
    topic: 'algebra',
    subtopic: 'expressions'
  },

  // Algebra - Intermediate
  {
    id: 'alg_2_1',
    question: 'Solve: 2x - 5 = 11',
    correct_answer: '8',
    explanation: 'Add 5 to both sides: 2x = 16, then divide by 2: x = 8',
    hints: ['First add 5 to both sides', 'Then divide by 2'],
    difficulty: 2,
    topic: 'algebra',
    subtopic: 'linear_equations'
  },
  {
    id: 'alg_2_2',
    question: 'Factor: x² + 5x + 6',
    correct_answer: '(x + 2)(x + 3)',
    explanation: 'Find two numbers that multiply to 6 and add to 5: 2 and 3',
    hints: ['Look for two numbers that multiply to 6', 'Those numbers should also add to 5'],
    difficulty: 2,
    topic: 'algebra',
    subtopic: 'factoring'
  },

  // Algebra - Advanced
  {
    id: 'alg_3_1',
    question: 'Solve using quadratic formula: x² - 4x + 3 = 0',
    correct_answer: 'x = 3 or x = 1',
    explanation: 'Using x = (-b ± √(b²-4ac))/2a where a=1, b=-4, c=3',
    hints: ['Use the quadratic formula', 'a=1, b=-4, c=3'],
    difficulty: 3,
    topic: 'algebra',
    subtopic: 'quadratic_equations'
  },

  // Geometry - Beginner
  {
    id: 'geo_1_1',
    question: 'What is the area of a rectangle with length 8 and width 5?',
    correct_answer: '40',
    explanation: 'Area = length × width = 8 × 5 = 40 square units',
    hints: ['Use the formula: Area = length × width', 'Multiply 8 by 5'],
    difficulty: 1,
    topic: 'geometry',
    subtopic: 'area'
  },
  {
    id: 'geo_1_2',
    question: 'What is the perimeter of a square with side length 6?',
    correct_answer: '24',
    explanation: 'Perimeter = 4 × side length = 4 × 6 = 24',
    hints: ['A square has 4 equal sides', 'Add all sides: 6 + 6 + 6 + 6'],
    difficulty: 1,
    topic: 'geometry',
    subtopic: 'perimeter'
  },

  // Geometry - Intermediate
  {
    id: 'geo_2_1',
    question: 'Find the area of a triangle with base 10 and height 6',
    correct_answer: '30',
    explanation: 'Area = (1/2) × base × height = (1/2) × 10 × 6 = 30',
    hints: ['Use the formula: Area = (1/2) × base × height', 'Multiply by 1/2'],
    difficulty: 2,
    topic: 'geometry',
    subtopic: 'area'
  },

  // Trigonometry - Intermediate
  {
    id: 'trig_2_1',
    question: 'In a right triangle, if the opposite side is 3 and hypotenuse is 5, find sin θ',
    correct_answer: '3/5 or 0.6',
    explanation: 'sin θ = opposite/hypotenuse = 3/5 = 0.6',
    hints: ['sin θ = opposite/hypotenuse', 'Divide 3 by 5'],
    difficulty: 2,
    topic: 'trigonometry',
    subtopic: 'ratios'
  },

  // Calculus - Advanced
  {
    id: 'calc_3_1',
    question: 'Find the derivative of f(x) = 3x² + 2x - 1',
    correct_answer: '6x + 2',
    explanation: 'f\'(x) = 6x + 2 using the power rule',
    hints: ['Use the power rule: d/dx[xⁿ] = nxⁿ⁻¹', 'Derivative of constant is 0'],
    difficulty: 3,
    topic: 'calculus',
    subtopic: 'derivatives'
  }
];

export const getQuestionsByTopic = (topic: string, difficulty: number, count: number = 5): Question[] => {
  const filtered = questionBank.filter(q => 
    q.topic === topic && q.difficulty === difficulty
  );
  
  // Shuffle and return requested count
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getRandomQuestions = (count: number = 5): Question[] => {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getWeakAreaQuestions = (weakTopics: string[], count: number = 5): Question[] => {
  const filtered = questionBank.filter(q => weakTopics.includes(q.topic));
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
