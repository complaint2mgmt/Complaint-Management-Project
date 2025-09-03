# Complaint Management System

A React-based complaint management system for telecom services with authentication, complaint submission, tracking, and FAQ features.

## Features

- **Authentication System**: Login and registration functionality
- **Complaint Management**: Submit and track complaints
- **FAQ Section**: Comprehensive FAQ with search and categorization
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CMS-App
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

### Development Mode
```bash
npm start
# or
yarn start
```

This will start the development server at `http://localhost:3000` and open the application in your default browser.

### Production Build
```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

### Testing
```bash
npm test
# or
yarn test
```

Runs the test suite in interactive mode.

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── complaint/      # Complaint management components
│   ├── faq/           # FAQ section components
│   └── ui/            # Reusable UI components
├── services/           # API services and constants
├── utils/              # Helper functions and validation
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Creates a production build
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## Technologies Used

- **React 18** - Frontend framework
- **React Hooks** - State management
- **Lucide React** - Icon library
- **CSS-in-JS** - Styling approach
- **Create React App** - Build tool and development environment

## Browser Support

The application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed: `npm install`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then run `npm install` again
4. Ensure you're using a compatible Node.js version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
