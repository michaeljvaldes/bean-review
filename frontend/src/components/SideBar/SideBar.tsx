import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';


interface SideBarProps { }

const SideBar: FC<SideBarProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box data-testid="SideBar" margin={'5px'} sx={{ height: '100vh' }}>
      <ButtonGroup orientation='vertical' spacing={1} variant='plain'>
        <Button
          variant={location.pathname === '/reviews' || location.pathname === '/' ? 'soft' : 'plain'}
          startDecorator={<DescriptionIcon />}
          onClick={() => navigate('/reviews')}
          sx={{ justifyContent: 'flex-start' }}
        >
          <Typography level='body-md'>Reviews</Typography>
        </Button>
        <Button
          variant={location.pathname === '/roasters' ? 'soft' : 'plain'}
          startDecorator={<BusinessIcon />}
          onClick={() => navigate('/roasters')}
          sx={{ justifyContent: 'flex-start' }}
        >
          <Typography level='body-md'>Roasters</Typography>
        </Button>
      </ButtonGroup>
    </Box>
  )
};

export default SideBar;
