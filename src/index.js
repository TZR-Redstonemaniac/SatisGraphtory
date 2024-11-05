// PACKAGE DEPENDENCIES
import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.js';
import 'normalize.css';
//import './styles/app.scss';

// COMPONENTS

// STYLES
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<StrictMode><App/></StrictMode>);