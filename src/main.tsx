import { BrowserRouter } from "react-router-dom";
import { startAttribution } from "./lib/attribution";
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { startAdMeasurement } from './lib/ad-measurement'

startAdMeasurement();
startAttribution();
const root = document.getElementById("root");
if (root) {
 const app=<BrowserRouter><App /></BrowserRouter>;
 if(root.hasChildNodes()) hydrateRoot(root,app);else createRoot(root).render(app);
}
