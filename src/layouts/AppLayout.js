import { Header } from '../containers/Header';
import { Footer } from '../containers/Footer';

export const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
