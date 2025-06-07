# Artisan Bakery

A modern, responsive web application for an artisan bakery. This project showcases the bakery's menu, specials, testimonials, location and hours, and allows customers to place orders online.

## Features

- Browse bakery menu with categorized products
- View daily specials and customer testimonials
- Quick order form for easy online ordering
- Responsive design for desktop and mobile devices
- Location and business hours information

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Artisan-Bakery.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Artisan-Bakery
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to view the app.

### Build for Production

To build the app for production:

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

## Technologies Used

- React with TypeScript
- Vite for build tooling and development server
- Tailwind CSS for styling
- ESLint for linting and code quality

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/             # Static data like products and testimonials
├── lib/              # Utility functions and types
├── pages/            # Page components for routing
├── App.tsx           # Main app component
├── main.tsx          # Entry point
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
