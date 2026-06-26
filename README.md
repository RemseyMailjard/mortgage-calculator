# Mortgage Calculator Demo

A small Angular demo that shows how a mortgage payment calculator can be built with modern Angular signals. It is meant to be easy to run, easy to inspect, and useful as a teaching example.

## What You Will Learn

This project demonstrates a few practical Angular ideas in one compact app:

- Using `signal()` for editable UI state such as home price, down payment, interest rate, and loan term.
- Using `computed()` for derived values such as loan amount, monthly payment, and total interest.
- Binding form controls to component state with template events.
- Keeping the UI accessible with labels, semantic sections, and readable focus styles.
- Styling a single-page calculator with responsive CSS.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) version 20 or newer.
- npm, which is included with Node.js.
- A terminal such as PowerShell, Command Prompt, or the VS Code integrated terminal.

You do not need to install the Angular CLI globally. The local project scripts will use the Angular CLI package installed in this project.

## Start the App

From the project folder, install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open the local app in your browser:

```text
http://localhost:4200/
```

When the server is running, Angular watches your files. If you change the code, the browser updates automatically.

## First Code Tour

Start with these files:

- `src/app/app.ts`: the calculator state and mortgage math.
- `src/app/app.html`: the form controls and payment summary.
- `src/app/app.css`: the layout, colors, responsive behavior, and focus styles.
- `src/styles.css`: small global page defaults.

The most important pattern is this: user inputs update signals, and calculated values are expressed as `computed()` signals. For example, when the home price or down payment changes, Angular automatically recalculates the loan amount and monthly payment.

## Try These Small Exercises

If you are using this project to learn, try one small change at a time:

1. Change the default home price in `app.ts`.
2. Add a new monthly cost, such as HOA fees, and include it in the monthly total.
3. Add a new summary line that shows the down payment percentage.
4. Adjust the CSS colors while keeping text contrast readable.
5. Add a reset button that restores the original calculator values.

After each change, check the browser and run the tests.

## Useful Commands

Run the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run unit tests once:

```bash
npm test -- --watch=false
```

## Notes

This calculator is a demo and should not be used as financial advice. Real mortgage payments can include additional costs such as private mortgage insurance, HOA fees, closing costs, and local rules that are not modeled here.