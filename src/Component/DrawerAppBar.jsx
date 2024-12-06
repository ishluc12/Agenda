import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LoginForm from './LoginForm'; // Adjust the import path as needed
import Registration from './Registration'; // Adjust the import path as needed
import {  Grid} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, EffectCards} from 'swiper/modules';
import {Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Universe from './Universe';
import MeetingRoom from './MeetingRoom';


import ReactPlayer from 'react-player';
import VideoModal from './VideoModal';
import {  Modal} from '@mui/material';



import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import backgroundImage from './pexels-anete-lusina-4792344.jpg';
import backgroundImage1 from './pen-1.jpg';
import backgroundImage2 from './paper-3094008_960_720.jpg';
import backgroundImage3 from './pexels-anete-lusina-4792344.jpg';
import backgroundImage4 from './pexels-anete-lusina-4792358.jpg';
import backgroundImage6 from './pexels-leeloothefirst-5417662.jpg';
import backgroundImage5 from './checklist-7236236_640.webp';
import backgroundImage7 from './Daily Routine.jpeg';
import backgroundImage8 from './pexels-zch-2791918-20337610.jpg';

/*about */
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';





const drawerWidth = 240;
const navItems = [
  { text: 'Home', link: '#home' },
  { text: 'About', link: '#about' },
  { text: 'Service', link: '#service' },
  { text: 'Contact', link: '#contact' },
  { text: 'SIGNUP', link: '#UpperDashboard' },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [showLoginForm, setShowLoginForm] = React.useState(true);
  const [showFullText, setShowFullText] = React.useState(false);

  //word autoplay
  const words = [
    "We help you to prioritize your",
    "daily tasks by encouraging you to",
    "create a plan for your daily work"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [animatedTexts, setAnimatedTexts] = React.useState(["", "", ""]);

  React.useEffect(() => {
    const animateText = (text, index) => {
      let currentIndex = 0;
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          setAnimatedTexts((prevTexts) => {
            const newTexts = [...prevTexts];
            newTexts[index] = text.slice(0, currentIndex + 1);
            return newTexts;
          });
          currentIndex++;
          if (currentIndex === text.length) {
            clearInterval(interval);
            setTimeout(resolve, 100); // Wait 1 second before starting next text
          }
        }, 100);
      });
    };
    const runAnimation = async () => {
      while (true) {
        for (let i = 0; i < words.length; i++) {
          await animateText(words[i], i);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between sentences
        }
      }
    };
    

    runAnimation();
  }, [currentWordIndex]);


  //qoutes content



/*for video */
const [expandedCard, setExpandedCard] = useState(null);
const [open, setOpen] = useState(false);
const [modalContent, setModalContent] = useState('');

const handleToggleText = (content) => {
  if (expandedCard === content) {
    setExpandedCard(null);
  } else {
    setExpandedCard(content);
  }
};

const handleCardClick = (content) => {
  setModalContent(content);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setModalContent('');
};

const handleDrawerToggle = () => {
  // Define the functionality for toggling the drawer here
  console.log('Drawer toggled');
};

  // Click handler to update selected content
 

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const toggleForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        AGENDA
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <a href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item.text} />
              </a>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
          >
            AGENDA
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                sx={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}
                component="a"
                href={item.link}
              >
                {item.text}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={handleDialogOpen}
              sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Signup
            </Button> 
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

{/* 
home */}
 <Box
      component="div"
      id="home"
      sx={{
        flex: 1,
        p: 3,
        minHeight: '100vh',
        background: '#050F46 ',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', // Added to ensure text color is readable against background
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4,
          width: '100%',
          maxWidth: '1200px',
          p: { xs: 2, md: 4 },
          background: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent background for better text readability
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adding a subtle shadow
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            color: '#ffffff', // Text color for readability
            gap: 2,
            textAlign: 'center',
            maxWidth: '50%',
            p: 2,
          }}
        >
          {animatedTexts.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{text}</Typography>
            </motion.div>
          ))}
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: '50%',
            margin: '20px auto 0',
            padding: '20px',
            flex: 1,
            flex: '1',
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
            effect="cards"
            grabCursor
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  background: `url(${backgroundImage4}) top/contain no-repeat`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* You can add content inside the slide here if needed */}
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  background: `url(${backgroundImage6}) top/contain no-repeat`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* You can add content inside the slide here if needed */}
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  background: `url(${backgroundImage5}) top/contain no-repeat`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* You can add content inside the slide here if needed */}
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  background: `url(${backgroundImage7}) top/contain no-repeat`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* You can add content inside the slide here if needed */}
              </Box>
            </SwiperSlide>
            {/* Add more SwiperSlides as needed */}
          </Swiper>
        </Box>
      </Box>
    </Box>

{/* about */}
      
<Box
      component="div"
      id="about"
      sx={{
        flex: 1,
        p: 3,
        minHeight: '100vh',
        background: '#050F46',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            textAlign: 'left',
            color: 'white',
            width: '100%',
          }}
        >
          {/* First Box */}
          <Box
            className="wrapper"
            sx={{
              mb: 3,
              width: '100%',
              maxWidth: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              p: 3,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5">About us</Typography>
            </Box>
            <Typography variant="body1">
              We understand the struggle of juggling a busy schedule and staying on top of your tasks. That's why we created
              <span style={{ fontWeight: 'bold' }}> Agenda</span>, a comprehensive agenda and scheduling app designed to streamline your life.
              <span style={{ fontWeight: 'bold' }}> Agenda </span> empowers you to create detailed agendas, manage your daily schedule effectively,
              and prioritize tasks – all within a user-friendly interface.
              {showFullText && (
                <>
                  Whether you're a busy professional, a student juggling multiple commitments, or simply someone looking to become more organized,
                  <span style={{ fontWeight: 'bold' }}> Agenda</span> provides the tools you need to take control of your time and achieve your goals.
                </>
              )}
            </Typography>
            <Button onClick={handleToggleText} variant="contained" color="primary" sx={{ mt: 2 }}>
              {showFullText ? 'View Less' : 'View More'}
            </Button>
          </Box>

          {/* Second Box */}
          <Box
            className="wrapper"
            sx={{
              mb: 3,
              width: '100%',
              maxWidth: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              p: 3,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
              <AssignmentIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5">Mission</Typography>
            </Box>
            <Typography variant="body1">
              At <span style={{ fontWeight: 'bold' }}> Agenda</span>, we envision a world where everyone feels empowered and in control of their time.
              We believe that effective scheduling and prioritization shouldn't be a privilege reserved for the few. Through innovative technology and a user-centric approach,
              we strive to make powerful agenda and scheduling tools accessible to everyone.
            </Typography>
          </Box>

          {/* Third Box */}
          <Box
            className="wrapper"
            sx={{
              width: '100%',
              maxWidth: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              p: 3,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
              <VisibilityIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5">Vision</Typography>
            </Box>
            <Typography variant="body1">
              Our mission is to revolutionize the way people manage their time. By providing a user-friendly and comprehensive agenda and scheduling app,
              we aim to empower individuals to achieve greater productivity, reduce stress, and ultimately, live more fulfilling lives.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>

    <Box
  component="div"
  id="service"
  sx={{
    flex: 1,
    p: 3,
    minHeight: '100vh',
    background: "#050F46",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }}
>
  <Container maxWidth="lg">
    <Grid container spacing={3} justifyContent="space-between">
      {/* Cards Section */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={3}>
          {/* First Card */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{ cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.1)', color:'white'  }} // Same color for all cards
              onClick={() => handleToggleText('Full content for making notes')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <InfoIcon sx={{ fontSize: 40, marginRight: 1 }} />
                  <Typography variant="h5">1. MAKE NOTES</Typography>
                </Box>
                <Typography variant="body1">
                  Click here to view more details about making notes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{ cursor: 'pointer',backgroundColor: 'rgba(255, 255, 255, 0.1)', color:'white'  }} // Same color for all cards
              onClick={() => handleToggleText('Full content for the second card')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ fontSize: 40, marginRight: 1 }} />
                  <Typography variant="h5">2. SCHEDULE YOUR CALENDER</Typography>
                </Box>
                <Typography variant="body1">
                  Click here to view more details about the second card content.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Third Card */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{ cursor: 'pointer',backgroundColor: 'rgba(255, 255, 255, 0.1)', color:'white' }} // Same color for all cards
              onClick={() => handleToggleText('Full content for the third card')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <VisibilityIcon sx={{ fontSize: 40, marginRight: 1 }} />
                  <Typography variant="h5">3. PLAN A MEETING</Typography>
                </Box>
                <Typography variant="body1">
                  Click here to view more details about the third card content.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Placeholder Section */}
      <Grid item xs={12} md={6}>
        <Box
          className="view-details"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            backgroundColor: '#f0f0f0',
            padding: 4,
            textAlign: 'center',
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            {expandedCard ? (
              <>
                <Typography variant="body1">
                  {expandedCard === 'Full content for making notes' && (
                    <>
                      Full content for making notes.
                      <Link to="/Universe">Create Note</Link>
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </>
                  )}
                  {expandedCard === 'Full content for the second card' && (
                    <>
                      Full content for the second card.
                      <Link to="/CalendarSchedule">calender schedule</Link>
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </>
                  )}
                  {expandedCard === 'Full content for the third card' && (
                    <>
                      Full content for the third card.
                      <Link to="/MeetingRoom">Meeting</Link>
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </>
                  )}
                </Typography>
                <Button onClick={() => setExpandedCard('')} variant="contained" color="primary" sx={{ mt: 2 }}>
                  View Less
                </Button>
              </>
            ) : (
              'Click on a card to display content here.'
            )}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>

  {/* contact division*/}
  <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'right',
        paddingTop: '10px',
        background: '#050F46',
      }}
    >
      {/* contact division*/}
      <Box
        component="div"
        id="contact"
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          marginBottom: '20px',

        }}
      >
        <Box
          component="form"
          action="#"
          sx={{ 
            
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px', 
            padding: '20px' // Add padding to the entire form
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="username" style={{ fontSize: '14px', fontWeight: '500' }}>Username</label>
            <TextField
              type="text"
              name="username"
              id="username"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { fontSize: '14px' } }} // Reduce text size in TextField
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="phone" style={{ fontSize: '14px', fontWeight: '500' }}>Phone</label>
            <TextField
              type="text"
              name="phone"
              id="phone"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { fontSize: '14px' } }} // Reduce text size in TextField
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email" style={{ fontSize: '14px', fontWeight: '500' }}>Email</label>
            <TextField
              type="email"
              name="email"
              id="email"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { fontSize: '14px' } }} // Reduce text size in TextField
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="comment" style={{ fontSize: '14px', fontWeight: '500' }}>Comment</label>
            <TextField
              id="comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputProps={{ sx: { fontSize: '14px' } }} // Reduce text size in TextField
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-end', fontSize: '14px' }}>
            Submit
          </Button>
        </Box>
      </Box>
      </Box>  


  <Box
    component="footer"
    sx={{
      width: '100%',
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
    }}
  >
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Agenda. All rights reserved.
    </Typography>
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Link href="https://www.facebook.com" target="_blank" color="inherit">
        <FacebookIcon />
      </Link>
      <Link href="https://www.twitter.com" target="_blank" color="inherit">
        <TwitterIcon />
      </Link>
      <Link href="https://www.instagram.com" target="_blank" color="inherit">
        <InstagramIcon />
      </Link>
      <Link href="https://www.youtube.com" target="_blank" color="inherit">
        <YouTubeIcon />
      </Link>
    </Box>
  </Box>

  
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{showLoginForm ? 'Login' : 'Register'}</DialogTitle>
        <DialogContent>
          {showLoginForm ? <LoginForm /> : <Registration />}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm} color="primary">
            {showLoginForm ? 'Register' : 'Login'}
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
