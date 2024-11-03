import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import Aos from 'aos'
import Router from './shared/Router'
import useResetToken from './hooks/useResetToken'
import { theme } from './constants/theme'
import Toast from './components/Toast'
import AuthProvider from './shared/AuthProvider'
import 'aos/dist/aos.css'

function App(): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: 0,
      },
    },
  })
  useResetToken()
  Aos.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease',
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
          <Toast />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
