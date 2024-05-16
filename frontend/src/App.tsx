import { useState } from 'react'
import { Box, Sheet, Stack } from '@mui/joy'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Feed from './components/Feed/Feed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Sheet>
      <NavBar></NavBar>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box flex={1}><SideBar></SideBar></Box>
        <Box flex={3}><Feed></Feed></Box>
      </Stack>
    </Sheet >
  )
}

export default App
