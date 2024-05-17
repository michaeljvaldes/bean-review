import { Drawer, ModalClose, Stack, Typography } from '@mui/joy';
import React, { FC } from 'react';
import SideBar from '../SideBar/SideBar';


interface SideDrawerProps { drawerOpen: boolean, setDrawerOpen: Function }

const SideDrawer: FC<SideDrawerProps> = ({ drawerOpen, setDrawerOpen }) => (
  <Drawer data-testid="SideDrawer" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    <Stack direction={'column'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography level='h2'>Bean Review</Typography>
        <ModalClose />
      </Stack>
      <SideBar />
    </Stack>
  </Drawer>
);

export default SideDrawer;
