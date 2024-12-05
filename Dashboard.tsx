import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import {
  Person,
  Security,
  ExitToApp,
  Dashboard as DashboardIcon,
  Settings,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { RBAC } from '../components/RBAC';
import { useNavigate } from 'react-router-dom';
import { UserManagement } from '../components/UserManagement';
import { RoleManagement } from '../components/RoleManagement';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = React.useState<string>('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      default:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Your Profile
                </Typography>
                <Typography>
                  Role: {user?.role?.name ? user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1) : ''}
                </Typography>
                <Typography>Email: {user?.email}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Permissions:
                  </Typography>
                  <List dense>
                    {user?.role?.permissions?.map((permission) => (
                      <ListItem key={permission.id}>
                        <ListItemIcon>
                          <Security fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={permission.name.replace('_', ' ').toUpperCase()}
                          secondary={permission.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 240,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            RBAC System
          </Typography>
        </Box>
        <List>
          <ListItemButton 
            selected={selectedView === 'dashboard'}
            onClick={() => setSelectedView('dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <RBAC allowedRoles={['admin']}>
            <ListItemButton
              selected={selectedView === 'users'}
              onClick={() => setSelectedView('users')}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItemButton>
            <ListItemButton
              selected={selectedView === 'roles'}
              onClick={() => setSelectedView('roles')}
            >
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary="Role Management" />
            </ListItemButton>
          </RBAC>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Paper>

      {/* Main content */}
      <Box sx={{ marginLeft: '240px', flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>
            {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
          </Typography>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};
