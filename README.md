# Kodryx Usecase Hub - Gen AI Use Cases

A modern, responsive React application showcasing 101 real-world Gen AI use cases from leading organizations. Built with Vite + React for fast performance and easy deployment.

## ✨ Features

- 🔍 **Real-time Search** - Search across titles, descriptions, and tech stacks
- 🎛️ **Advanced Filters** - Filter by Category, Industry, and Tech Stack
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean design with smooth animations
- ⚡ **Fast Performance** - Built with Vite for lightning-fast builds
- 🚀 **Deploy-Ready** - Configured for Vercel, Netlify, and GitHub Pages

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **State Management**: Custom React Hooks
- **Deployment**: Vercel / Netlify ready

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Instructions to Run the Project

#### 1. Clone the Repository

```bash
git clone https://github.com/srivardhan-kondu/Final-UsecaseHub.git
```

#### 2. Navigate to Project Directory

```bash
cd Final-UsecaseHub
```

#### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including React, Vite, React Router, and other dependencies.

#### 4. Start the Development Server

```bash
npm run dev
```

#### 5. Open in Browser

The application will automatically start on [http://localhost:5173](http://localhost:5173)

Open your browser and navigate to:
```
http://localhost:5173
```

#### 6. Using the Application

1. **Sign In**: Enter your name, email, and organization on the landing page
2. **Browse**: Explore 101 Gen AI use cases
3. **Search**: Use the search bar to find specific use cases
4. **Filter**: Apply filters by Category, Industry, or Tech Stack
5. **View Details**: Click on any use case card to see full details

### Quick Start (One Command)

```bash
git clone https://github.com/srivardhan-kondu/Final-UsecaseHub.git && cd Final-UsecaseHub && npm install && npm run dev
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages

```bash
npm run build
# Push the dist/ folder to gh-pages branch
```

## 📁 Project Structure

```
Final-UsecaseHub/
├── public/              # Static assets
│   └── logo.png
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── UsecaseGrid.jsx
│   │   ├── UsecaseCard.jsx
│   │   └── UsecaseModal.jsx
│   ├── pages/           # Page components
│   │   ├── SignInPage.jsx
│   │   └── BrowsePage.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useUsecases.js
│   │   └── useFilters.js
│   ├── styles/          # CSS Modules
│   │   └── *.module.css
│   ├── data/            # JSON data
│   │   └── usecases_101.json
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel config
└── netlify.toml         # Netlify config
```

## 🎯 Use Cases

The application showcases **101 Gen AI use cases** across various industries:

- **Retail** - E-commerce, inventory management, customer service
- **Media & Entertainment** - Content creation, personalization
- **Automotive & Logistics** - Fleet management, supply chain
- **Healthcare** - Patient care, diagnostics
- **Finance** - Risk analysis, fraud detection
- **Manufacturing** - Quality control, predictive maintenance
- And more...

## 📱 Responsive Design

- **Mobile** (320px - 768px): Single column layout, hamburger menu
- **Tablet** (768px - 1024px): Two-column grid, collapsible sidebar
- **Desktop** (1024px+): Three-column grid, fixed sidebar

## 🔧 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Srivardhan Kondu**
- GitHub: [@srivardhan-kondu](https://github.com/srivardhan-kondu)

---

Built with ❤️ using React and Vite
