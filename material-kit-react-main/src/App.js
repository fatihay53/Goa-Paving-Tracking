import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
    function getToastContainer () {
        return <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            className="toastify-container"
            toastClassName="toastify-toast"
        />;
    }

  return (
    <ThemeConfig>
        {getToastContainer()}
        <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
