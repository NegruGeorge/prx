import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Button from '@mui/material/Button';

import {useEffect,useState} from "react";
import ClaimBatch from './ClaimBatch';
import ClaimAccount from './ClaimAccount';
import Mint from './Mint';
import { useWeb3Modal, Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'



const drawerWidth = 240;




function PermanentDrawer() {
 const { address, isConnected } = useAccount()
const [selectedIndex,setSelectedIndex] = useState(0);


function handleChange(text:any,index:any){
    setSelectedIndex(index);
  }


async function connect(){
        try{
        //    activate(injectedConnector)
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
      
            <Web3Button/>

            {isConnected ? <h1>{address}</h1> : null}
                

      </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {['ClaimBatch', 'ClaimAccount', 'Mint'].map((text, index) => (
          <ListItem button key={text} selected={selectedIndex ===index}  onClick= {()=> handleChange(text,index)}>
            <ListItemIcon>
              {(index === 0) ? <MenuBookIcon/>:null}
              {(index === 1) ? <AccountCircleIcon/>:null}
              {(index === 2) ? <AddCircleIcon/>:null}
              {(index === 3) ?  <CurrencyBitcoinIcon/>:null }
              {(index === 4) ? <InfoIcon/>:null}
            
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />

        {selectedIndex ===0 ? <ClaimBatch/>:null}
        {selectedIndex ===1 ? <ClaimAccount/>:null}
        {selectedIndex ===2 ? <Mint/>:null}

      {/* <Typography paragraph>
          from the main Drawer
      </Typography> */}
    </Box>
  </Box>  )
}

export default PermanentDrawer