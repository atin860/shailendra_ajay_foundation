# How to Run the Project

This guide explains how to set up and run the Donation Website project locally.

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1.  Open your terminal.
2.  Navigate to the project directory:
    ```bash
    cd /Users/vineetsharma/Atin/donation-project
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Development Server

To start the project in development mode using Vite:

```bash
npm run dev
```

This will start a local server, usually at `http://localhost:5173`. Open this URL in your browser to view the application.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The build artifacts will be generated in the `dist` directory.

## Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

*   `src/`: Source code
*   `public/`: Static assets
*   `index.html`: Entry HTML file
*   `vite.config.js`: Vite configuration
*   `tailwind.config.js`: Tailwind CSS configuration
