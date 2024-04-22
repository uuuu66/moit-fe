import ReactDOM from 'react-dom/client'
import App from './App'
import './reset.css'

const rootElement = document.getElementById('root')
if (import.meta.env.PROD) console.log = () => {}
if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<App />)
}
