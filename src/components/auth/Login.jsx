// src/components/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Fade,
  Link,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  ArrowForward,
  Phone,
  Email,
} from '@mui/icons-material';
import api from '../../services/axios';

// Forgot Password Dialog Component
const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/users/reset-password/', { email });
      setSuccess('Password reset instructions have been sent to your email.');
      setTimeout(() => {
        onClose();
        setEmail('');
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reset Password</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Send Instructions
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// OTP Verification Dialog Component
const OTPVerificationDialog = ({ open, onClose, phone, onVerificationComplete }) => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/users/verify-otp/', { phone, otp });
      onVerificationComplete(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Enter OTP</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleVerify} variant="contained" disabled={loading}>
          Verify OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Login Component
const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login/', formData);
      localStorage.setItem('token', response.data.tokens.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.user.user_type === 'CLIENT') {
        navigate('/client/dashboard');
      } else {
        navigate('/professional/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleOTPRequest = async () => {
    try {
      await api.post('/users/send-otp/', { phone });
      setOtpDialogOpen(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const handleOTPVerificationComplete = (data) => {
    localStorage.setItem('token', data.tokens.access);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    if (data.user.user_type === 'CLIENT') {
      navigate('/client/dashboard');
    } else {
      navigate('/professional/dashboard');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box sx={{ color: 'white', pr: 4 }}>
                  <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                    Welcome Back
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                    Sign in to access your account
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Don't have an account?
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/register')}
                    sx={{
                      mt: 2,
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Fade>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Sign In
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant={loginMethod === 'password' ? 'contained' : 'outlined'}
                    onClick={() => setLoginMethod('password')}
                    sx={{ mb: 1 }}
                  >
                    Login with Password
                  </Button>
                  <Button
                    fullWidth
                    variant={loginMethod === 'otp' ? 'contained' : 'outlined'}
                    onClick={() => setLoginMethod('otp')}
                  >
                    Login with OTP
                  </Button>
                </Box>

                {loginMethod === 'password' ? (
                  <form onSubmit={handlePasswordLogin}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      sx={{ mb: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                      <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={() => setForgotPasswordOpen(true)}
                      >
                        Forgot Password?
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </form>
                ) : (
                  <Box>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleOTPRequest}
                      disabled={!phone}
                      sx={{ mb: 2 }}
                    >
                      Send OTP
                    </Button>
                  </Box>
                )}

                {isMobile && (
                  <>
                    <Divider sx={{ my: 2 }}>
                      <Typography color="text.secondary">
                        New to Sweekar?
                      </Typography>
                    </Divider>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate('/register')}
                    >
                      Create Account
                    </Button>
                  </>
                )}
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />

      <OTPVerificationDialog
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        phone={phone}
        onVerificationComplete={handleOTPVerificationComplete}
      />
    </Box>
  );
};

export default Login;