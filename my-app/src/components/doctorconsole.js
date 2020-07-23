import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link  from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button'
import { mainListItems, secondaryListItems } from './test/ListItems';
import { Link as Lk }from 'react-router-dom';
import Deposits from './test/Deposits';
import Appointments from './test/Appointments';
import DoctorData from '../data/doctordata';
import {Textfield} from 'react-mdl';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import Medical from './test/Medical';
import ChatRequest from './test/Chatrequests';
import { Redirect } from 'react-router-dom';
import {useEffectOnce} from 'react-use';
import {Modal} from 'react-bootstrap';
import Video_Audio_window from '../Video_Audio_call_for_Doctor'
import Chatbox from './chatbox';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        E-Health
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '500px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width:'200px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    
    width: '100%',
    
    
  },
}));

export default function DoctorDashboard({doctorinfo = ""}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [QB, setQB] = React.useState(require('../../node_modules/quickblox/quickblox'));
  const [array_of_details, set_array_of_details] = React.useState([]);
  const [patient_id, set_patient_id] = React.useState(0);
  const [specialist_id, set_specialist_id] = React.useState(0);
  const [is_confirm, set_is_confirm] = React.useState(false);
  const [is_user_calling, set_is_user_calling] = React.useState(false);  
  const [chatter, set_is_chat] = React.useState(false);

  useEffectOnce(() => {
    var CREDENTIALS = {
    'appId': "84745",
    'authKey': 'LdXtzcfrYbBjeAe',
    'authSecret': 'dBGXnpyZWmqzTWf'
    };

    QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);
    sessioncreater();
}, [QB]);  


const sessioncreater = () => {
  var params = {login: 'sajal',password: 'quickblox'};  
  QB.createSession(params, function(err, result) {
  if(result)
  {
  console.log("session created");
  console.log(result);
  }
  else
  {
  console.log("error thrown");
  console.error(err);// callback function
  }
});
}

const get_users = async(email, is_who) => {
  var searchParams = {email: email};
  QB.users.get(searchParams, function(error, user){
    if(user){
      console.log("users found");
      console.log(user);
      if(is_who)
      set_patient_id(user.id);
      else
      set_specialist_id(user.id);
      return user;
    }
    else{
      console.log("error in finding users");
      console.error(error);
    }
});
  return "sajal";
}  


const handle_User_Calling = async(date, specialist_email_id, patient_email_id, time_start, time_end, type_of_call) => {
  console.log(date, specialist_email_id, patient_email_id, time_start, time_end, type_of_call);
  set_array_of_details([date, specialist_email_id, patient_email_id, time_start, time_end, type_of_call]);
  console.log(array_of_details);
  if(type_of_call == "Chat"){
    set_is_chat(true);
  }
  else{
  console.log(get_users(specialist_email_id, 0));
  console.log(get_users(patient_email_id, 1));
  console.log(patient_id);
  console.log(specialist_id);
  set_is_confirm(true);
  }
}

const handleCloseConfirmAndAccept = () => {
  set_is_confirm(false);
  set_is_user_calling(true);
}

const handleCloseConfirm = () => {
  set_is_confirm(false);
  set_is_user_calling(false);
  sessioncreater();
}

const handleCloseChat = () => {
  set_is_chat(false);
}




  if(doctorinfo != "")
  {
  return (
    <div>
      {is_user_calling ?
      <Modal show={is_user_calling}>
        <Modal.Header closeButton>
          <Modal.Title>Communication with Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body><Video_Audio_window detail_array = {array_of_details} QB = {QB} patient_id = {patient_id} specialist_id = {specialist_id} endcallfunc = {handleCloseConfirm}/></Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
:
<div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hello Dr. {doctorinfo[0].name}
          </Typography>
          
          
          <Lk to="/" color="white"> <Button variant="contained" color="primary">Logout
          </Button></Lk>
          
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                
              
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <ChatRequest/><div></div>
            </div>
            
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
              <Appointments info_of_patient = {doctorinfo} is_patient = {0} handle_User_Calling = {handle_User_Calling}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <Modal show={is_confirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kindly confirm if you are ready to accept the call from the patient</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfirmAndAccept}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={chatter} onHide={handleCloseChat}>
        <Modal.Header closeButton>
          <Modal.Title>ChatBox</Modal.Title>
        </Modal.Header>
        <Modal.Body><Chatbox details = {array_of_details} is_patient = {0}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChat}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
      </div>  
  );
      }

else{
  return <Redirect to="/"/>
}
}