import VesselDetails from "./pages/VesselDetails";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { getSeo, seoPaths } from './lib/seo';
export { getSeo, seoPaths };
export function render(path: string) { return renderToString(<StaticRouter location={path}><App VesselPage={VesselDetails} /></StaticRouter>); }
