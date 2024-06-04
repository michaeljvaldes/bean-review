import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy';
import React, { FC } from 'react';
import { useCurrentUserContext } from '../CurrentUserContext/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const postLogout = (token: string | null) => {
  const response = axios.post(
    '/api/auth/logout/',
    null,
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
  return response
}

interface NavBarProps { openDrawer: Function }

const NavBar: FC<NavBarProps> = ({ openDrawer }) => {
  const { currentUser, auth, setAuth } = useCurrentUserContext()

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAuth({ token: null, currentUserId: null })
    }
  })
  const navigate = useNavigate()

  return (
    <Stack
      data-testid="NavBar"
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={{ xs: 'block', sm: 'none' }}>
        <IconButton onClick={() => openDrawer()}>
          <MenuIcon></MenuIcon>
        </IconButton>
      </Box>
      <Typography level='h3'>Bean Review</Typography>
      {currentUser &&
        <Dropdown>
          <MenuButton>{currentUser.username}</MenuButton>
          <Menu>
            <MenuItem onClick={() => logoutMutation.mutate(auth.token)}>logout</MenuItem>
          </Menu>
        </Dropdown>}
      {!currentUser && <Button onClick={() => navigate('/login')}>log in</Button>}
    </Stack>
  )
};

export default NavBar;
