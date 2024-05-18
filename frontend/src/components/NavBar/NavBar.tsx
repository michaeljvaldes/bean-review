import { Menu } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/joy';
import React, { FC } from 'react';


interface NavBarProps { openDrawer: Function }

const NavBar: FC<NavBarProps> = ({ openDrawer }) => (
  <Stack data-testid="NavBar" direction={'row'} justifyContent={'space-between'}>
    <Box display={{ xs: 'block', sm: 'none' }}>
      <IconButton onClick={() => openDrawer()}>
        <Menu></Menu>
      </IconButton>
    </Box>
    <Typography level='h3'>Bean Review</Typography>
  </Stack>
);

export default NavBar;
