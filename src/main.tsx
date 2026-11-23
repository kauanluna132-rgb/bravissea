import { startAttribution } from "./lib/attribution";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { startAdMeasurement } from './lib/ad-measurement'

startAdMeasurement();
startAttribution();
const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
