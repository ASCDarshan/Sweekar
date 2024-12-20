// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { theme } from './theme';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ProfessionalDashboard from './components/dashboard/ProfessionalDashboard';
import ConsultationList from './components/consultation/ConsultationList';
import ConsultationDetail from './components/consultation/ConsultationDetail';
import BookConsultation from './components/consultation/BookConsultation';
import ClientProfile from './components/profile/ClientProfile';
import ProfessionalProfile from './components/profile/ProfessionalProfile';
import AuthGuard from './components/auth/AuthGuard';
import { Provider } from 'react-redux';
import { store } from './features/store';
import ServicesPage from './pages/ServicesPage';
import ExpertsPage from './pages/ExpertsPage';
import CentresPage from './pages/CentresPage';
import BlogPage from './pages/BlogPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <div style={{ flex: 1, paddingBottom: '20px' }}>
                <Routes>
                  <Route path="/login" element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
                  } />
                  <Route path="/register" element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
                  } />
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/experts" element={<ExpertsPage />} />
                  <Route path="/centres" element={<CentresPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      isAuthenticated ? (
                        localStorage.getItem('user')?.includes('"user_type":"CLIENT"') ? (
                          <Navigate to="/client/dashboard" />
                        ) : (
                          <Navigate to="/professional/dashboard" />
                        )
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />

                  <Route
                    path="/client/dashboard"
                    element={
                      <AuthGuard userType="CLIENT">
                        <ClientDashboard />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/client/profile"
                    element={
                      <AuthGuard userType="CLIENT">
                        <ClientProfile />
                      </AuthGuard>
                    }
                  />

                  <Route
                    path="/professional/dashboard"
                    element={
                      <AuthGuard userType="PROFESSIONAL">
                        <ProfessionalDashboard />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/professional/profile"
                    element={
                      <AuthGuard userType="PROFESSIONAL">
                        <ProfessionalProfile />
                      </AuthGuard>
                    }
                  />

                  <Route
                    path="/consultations"
                    element={
                      <AuthGuard userType="*">
                        <ConsultationList />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/consultation/:id"
                    element={
                      <AuthGuard userType="*">
                        <ConsultationDetail />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/book-consultation"
                    element={
                      <AuthGuard userType="CLIENT">
                        <BookConsultation />
                      </AuthGuard>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;