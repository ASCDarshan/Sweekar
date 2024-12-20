// src/pages/ContactPage.jsx
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Divider,
    useTheme,
    useMediaQuery
  } from '@mui/material';
  import {
    Email,
    Phone,
    LocationOn,
    WhatsApp,
    Send,
    AccessTime
  } from '@mui/icons-material';
  
  const ContactPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
    return (
      <Box>
        {/* Hero Section */}
        <Box 
          sx={{ 
            bgcolor: 'primary.light',
            py: { xs: 6, md: 10 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              gutterBottom 
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: 'primary.dark'
              }}
            >
              Connect With Us
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Have questions or need support? We're here to help you connect with the right resources and support services.
            </Typography>
          </Container>
  
          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(157, 132, 183, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(157, 132, 183, 0.1)',
            }}
          />
        </Box>
  
        <Container maxWidth="lg" sx={{ position: 'relative', mt: -6, mb: 8, zIndex: 2 }}>
          <Grid container spacing={4}>
            {/* Contact Information Card */}
            <Grid item xs={12} md={5}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Get in Touch
                  </Typography>
                  
                  <List sx={{ mt: 4 }}>
                    <ListItem sx={{ mb: 3 }}>
                      <ListItemIcon>
                        <Phone sx={{ color: 'white', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Phone
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            (+91) 85111 26808
                          </Typography>
                        }
                      />
                    </ListItem>
  
                    <ListItem sx={{ mb: 3 }}>
                      <ListItemIcon>
                        <LocationOn sx={{ color: 'white', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Address
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            Shri Maharani Chimnabai Stree Udyogalaya,<br />
                            Opp. Sursagar Lake,<br />
                            Vadodara. 390001
                          </Typography>
                        }
                      />
                    </ListItem>
  
                    <ListItem sx={{ mb: 3 }}>
                      <ListItemIcon>
                        <AccessTime sx={{ color: 'white', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Working Hours
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            Monday - Saturday<br />
                            9:00 AM - 6:00 PM
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
  
                  {/* Decorative circle */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
  
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Send us a Message
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>
  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="How can we help you?"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<Send />}
                        sx={{ 
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
  
        {/* Map Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
              Visit Us
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
              Find us at our location opposite to Sursagar Lake
            </Typography>
            <Paper elevation={3} sx={{ height: 400, borderRadius: 4 }}>
              {/* Add Google Maps iframe or component here */}
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1845.6838688858468!2d73.203417!3d22.301928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f564000001%3A0x209077d9d0bca2cf!2sSHREE%20MAHARANI%20CHIMNABAI%20STREE%20UDYOGALAYA!5e0!3m2!1sen!2sin!4v1734520014817!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: 16 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Container>
        </Box>
      </Box>
    );
  };
  
  export default ContactPage;