import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { store } from './store'
import { Provider } from 'react-redux'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
