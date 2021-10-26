import { Header } from '../containers/Header';
import { Footer } from '../containers/Footer';

export const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="sdp-container">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
