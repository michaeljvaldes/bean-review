import { useState } from 'react'
import { Box, Divider, Sheet, Stack } from '@mui/joy'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import { Outlet } from 'react-router-dom'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Sheet>
      <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}></SideDrawer>
      <NavBar openDrawer={() => setDrawerOpen(true)}></NavBar>
      <Divider></Divider>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box flex={1} display={{ xs: 'none', sm: 'block' }}><SideBar></SideBar></Box>
        <Divider orientation='vertical' />
        <Box flex={3} margin={'10px'}><Outlet /></Box>
      </Stack>
    </Sheet >
  )
}

export default App
