import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './routes'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { ThemeProvider } from './context/ThemeContext'
import { SiteSettingsProvider } from './context/SiteSettingsContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <SiteSettingsProvider>
          <ThemeProvider>
            <AuthProvider>
              <ContentProvider>
                <RouterProvider router={router} />
              </ContentProvider>
            </AuthProvider>
          </ThemeProvider>
        </SiteSettingsProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
