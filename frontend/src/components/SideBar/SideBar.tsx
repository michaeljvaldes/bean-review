import { Box, Stack, Typography } from '@mui/joy';
import React, { FC } from 'react';


interface SideBarProps { }

const SideBar: FC<SideBarProps> = () => (
  <Stack data-testid="SideBar" direction={'column'}>
    <Box>
      <Typography level='title-md'>Reviews</Typography>
    </Box>
    <Box>
      <Typography level='title-md'>Roasters</Typography>
    </Box>
    <Box>
      <Typography level='title-md'>Following</Typography>
    </Box>
  </Stack >
);

export default SideBar;
