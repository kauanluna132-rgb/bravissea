import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { startAdMeasurement } from './lib/ad-measurement'

startAdMeasurement();
const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
