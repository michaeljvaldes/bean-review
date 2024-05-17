import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewsIcon from '@mui/icons-material/Reviews';
import BusinessIcon from '@mui/icons-material/Business';


interface SideBarProps { }

const SideBar: FC<SideBarProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box data-testid="SideBar" margin={'10px'}>
      <ButtonGroup orientation='vertical' spacing={1} variant='plain'>
        <Button
          variant={location.pathname === '/reviews' || location.pathname === '/' ? 'soft' : 'plain'}
          startDecorator={<ReviewsIcon />}
          onClick={() => navigate('/reviews')}>
          <Typography level='title-md'>Reviews</Typography>
        </Button>
        <Button
          variant={location.pathname === '/roasters' ? 'soft' : 'plain'}
          startDecorator={<BusinessIcon />}
          onClick={() => navigate('/roasters')}>
          <Typography level='title-md'>Roasters</Typography>
        </Button>
      </ButtonGroup>
    </Box>
  )
};

export default SideBar;
