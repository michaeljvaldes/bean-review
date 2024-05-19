import { Box, Input, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React, { FC, useState } from 'react';
import Roaster from '../../models/roaster';
import { useQuery } from '@tanstack/react-query';
import { Search } from '@mui/icons-material';
import PaginatedResonse from '../../models/paginatedResponse';


const PAGE_SIZE = 100

const getRoasters = async () => {
  const response = await axios.get(`/roasters.json`)
  const data: PaginatedResonse<Roaster> = response.data
  return data
}

const useRoastersQuery = () => {
  return useQuery({ queryKey: ['roasters'], queryFn: getRoasters })
}

interface RoastersProps { }

const Roasters: FC<RoastersProps> = () => {
  const [limit, setLimit] = useState(PAGE_SIZE)
  const query = useRoastersQuery()
  const [filterText, setFilterText] = useState('')

  return (
    <Box data-testid="Roasters">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography level='h2'>Roasters</Typography>
        <Input
          onChange={(event) => setFilterText(event.target.value)}
          startDecorator={<Search />}
        ></Input>

      </Stack>
      <Stack direction={'column'}>
        {query.data?.results.filter(roaster => roaster.name.toLocaleLowerCase().includes(filterText)).map(roaster => (
          <Typography>{roaster.name}</Typography>
        ))}
      </Stack>
    </Box>
  )
};

export default Roasters;
