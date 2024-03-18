import '@/styles/globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { QueryClientProvider,QueryClient } from 'react-query';
import { store } from './redux/Store'
import { Provider } from 'react-redux';
//create a client
const queryClient = new QueryClient();
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

export default function App({ Component, pageProps }) {

  return (
   <>
   <QueryClientProvider client={queryClient}>
   <Provider store={store}>
    <Navbar />
    </Provider>
    
   </QueryClientProvider>
    <div className='flex'>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
    </div>
    <Provider store={store}>
      <Sidebar />
    </Provider>
   </>
  )
}
