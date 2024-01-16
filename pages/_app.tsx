import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
//import '@/styles/caesarcoinhome.css'
import type { AppProps } from 'next/app'
import ReduxProvider from '@/store/ReduxProvider'
import { ToastContainer } from 'react-toastify'
function App({ Component, pageProps }: AppProps) {
  return <ReduxProvider><><Component {...pageProps} /><ToastContainer /></></ReduxProvider>
}
export default App