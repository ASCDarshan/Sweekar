// src/components/dashboard/ClientDashboard.jsx
import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { CalendarMonth, Schedule, Assessment } from '@mui/icons-material';
import api from '../../services/axios';

const ClientDashboard = () => {
  const [upcomingConsultations, setUpcomingConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await api.get('/consultations/consultations/?status=SCHEDULED');
        setUpcomingConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome back!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'flex-start', mt: 2 }}
              onClick={() => window.location.href = '/book-consultation'}
            >
              Book New Consultation
            </Button>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Schedule color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" component="div">
                Upcoming Sessions
              </Typography>
              <Typography variant="h4">
                {upcomingConsultations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Consultations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Consultations
            </Typography>
            <Grid container spacing={2}>
              {upcomingConsultations.map((consultation) => (
                <Grid item xs={12} md={6} key={consultation.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {consultation.professional_name}
                      </Typography>
                      <Typography color="textSecondary">
                        {new Date(consultation.scheduled_time).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Type: {consultation.consultation_type}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDashboard;