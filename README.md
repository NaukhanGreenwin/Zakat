# 🌙 Zakat Calculator

A modern, comprehensive Zakat calculator web application built with Next.js and TypeScript.

## Features

- Detailed financial asset tracking (cash, gold, silver, investments, business assets)
- Liability deduction
- Accurate Nisab threshold calculation with real-time gold prices
- Beautiful, responsive UI with Tailwind CSS
- Tabbed input sections for easy navigation
- Instant calculation results with print functionality
- Comprehensive FAQ section with Quranic and Hadith references

## Live Demo

Visit the live application: [Zakat Calculator](https://zakat-calculator.onrender.com) (Link will be active after deployment)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zakat-calculator.git
cd zakat-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Render

This application can be easily deployed to [Render](https://render.com) by following these steps:

1. Push your code to GitHub
2. Sign up for a free Render account
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure the service:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node.js
   - Node Version: 18 or higher
6. Click "Create Web Service"

## About Zakat

Zakat is one of the Five Pillars of Islam and refers to the obligation that an individual has to donate a certain proportion of wealth each year to charitable causes. Zakat is mandatory for all Muslims who meet the necessary criteria of wealth.

### Zakat Calculation Basics

- Zakat is due on wealth that exceeds the Nisab threshold (equivalent to 85 grams of gold or 595 grams of silver)
- The standard Zakat rate is 2.5% of eligible wealth
- Zakat is calculated on assets owned for one full lunar year

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Real-time gold and silver price API integration

## License

This project is open-source software licensed under the MIT license.

## Disclaimer

This calculator is provided as a tool to assist in calculating Zakat. It is not a substitute for advice from a qualified Islamic scholar. Users should consult with a knowledgeable authority for specific questions about their Zakat obligations.
