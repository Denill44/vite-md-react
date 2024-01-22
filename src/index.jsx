import React from 'react';
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material';
import { theme } from './theme'
import './style.css';
import { RouterProvider } from 'react-router-dom';
import { pages } from './pages';


const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={pages} />
    </ThemeProvider>
  </React.StrictMode>,
)