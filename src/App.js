import { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Button, Switch,
  Card, CardContent, List, ListItem, ListItemIcon, ListItemText,
  Divider, Drawer, CssBaseline, Grid, useMediaQuery
} from '@mui/material';
import {
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Smartphone as SmartphoneIcon,
  Wifi as WifiIcon,
  BatteryFull as BatteryIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Navigation Drawer Component
const NavigationDrawer = ({ currentPage, setCurrentPage, isMobile, drawerOpen, setDrawerOpen }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const navItems = [
    { id: 'home', label: 'Door Control', icon: <LockIcon /> },
    { id: 'instructions', label: 'How to Use', icon: <InfoIcon /> },
  ];

  const drawerWidth = 240;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <SecurityIcon sx={{ mr: 1 }} />
          Access Control
        </Typography>
        <Typography variant="caption">
          Sample Website for IETP
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, p: 0 }}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.id}
            selected={currentPage === item.id}
            onClick={() => {
              setCurrentPage(item.id);
              if (isMobile) setDrawerOpen(false);
            }}
            sx={{
              borderLeft: currentPage === item.id ? '4px solid' : 'none',
              borderLeftColor: 'primary.main',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: currentPage === item.id ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: currentPage === item.id ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ListItem 
          button 
          onClick={toggleTheme}
          sx={{ borderRadius: 1 }}
        >
          <ListItemText 
            primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          />
          <Switch 
            checked={isDarkMode} 
            onChange={toggleTheme} 
            color="default"
            onClick={(e) => e.stopPropagation()}
          />
        </ListItem>
      </Box>

      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          IETP Group 16
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

// Main Component
const MainContent = () => {
  const [isDoorLocked, setIsDoorLocked] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const isMobile = useMediaQuery('(max-width:768px)');
  const { isDarkMode } = useTheme();

  // here is  Toggle lock/unlock with single button
  const toggleDoorLock = () => {
    const newState = !isDoorLocked;
    setIsDoorLocked(newState);
    
    // Backend connection point
    console.log(`${newState ? 'Locking' : 'Unlocking'} door...`);
  };

  // 1. main page
  const renderHomePage = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        px: 2
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Main Door Access
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={toggleDoorLock}
        sx={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          margin: 4,
          backgroundColor: isDoorLocked ? 'error.main' : 'success.main',
          '&:hover': {
            backgroundColor: isDoorLocked ? 'error.dark' : 'success.dark',
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}
        startIcon={isDoorLocked ? 
          <LockIcon sx={{ fontSize: '2rem' }} /> : 
          <UnlockIcon sx={{ fontSize: '2rem' }} />
        }
      >
        {isDoorLocked ? 'LOCKED' : 'UNLOCKED'}
      </Button>
      
      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
        Click to {isDoorLocked ? 'unlock' : 'lock'} the main door
      </Typography>
      
      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: isDoorLocked ? 'error.main' : 'success.main'
        }} />
        <Typography variant="h6">
          Door Status: <strong style={{ 
            color: isDoorLocked ? '#f44336' : '#4caf50',
            marginLeft: 8
          }}>
            {isDoorLocked ? 'LOCKED' : 'UNLOCKED'}
          </strong>
        </Typography>
      </Box>
    </Box>
  );

  // 2. Instructions Page
  const renderInstructionsPage = () => (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <SecurityIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        How to Use the Access System
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <LockIcon color="primary" sx={{ mr: 1 }} />
                Basic Operation
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LockIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Single Button Control"
                    secondary="Click the large button to toggle lock/unlock"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SmartphoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mobile Access"
                    secondary="Access your door from anywhere"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WifiIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Internet Required"
                    secondary="Stable connection needed for remote access"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BatteryIcon color="primary" sx={{ mr: 1 }} />
                Troubleshooting
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Door not responding?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1. Check internet connection
                  <br />
                  2. Verify lock has power
                  <br />
                  3. Refresh the app
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Need help?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact support: IETP16@gmail.com
                  <br />
                  Emergency: 0911121314
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      <NavigationDrawer 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobile={isMobile}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}>
        {/*for Mobile */}
        {isMobile && (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(!drawerOpen)}
                edge="start"
                sx={{ mr: 2 }}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {currentPage === 'home' ? 'Door Control' : 'Instructions'}
              </Typography>
              <HomeIcon sx={{ mr: 1 }} />
            </Toolbar>
          </AppBar>
        )}
        
        <Box 
          sx={{ 
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {currentPage === 'home' ? renderHomePage() : renderInstructionsPage()}
        </Box>
        

        {/* Footer */}
        <Box
          sx={{
            py: 2,
            px: 3,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary">
             Secure & Reliable
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;