import { Box, Card, Divider, Input, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import React, { FC, useState } from 'react';
import Roaster from '../../models/roaster';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search } from '@mui/icons-material';
import PaginatedResponse from '../../models/paginatedResponse';
import InfiniteScroll from 'react-infinite-scroll-component';


const getRoasters = async ({ queryKey, pageParam }: { queryKey: string[], pageParam: string }) => {
  const nameFilter = queryKey[1] ?? ''
  const searchParam = nameFilter.length > 0 ? `&search=${nameFilter}` : ''
  const response = await axios.get(`/roasters.json/?page=${pageParam}${searchParam}`)
  const data: PaginatedResponse<Roaster> = response.data
  return data
}

const useRoastersQuery = (nameFilter: string) => {
  return useInfiniteQuery({
    queryKey: ['roasters', nameFilter],
    queryFn: getRoasters,
    initialPageParam: '1',
    getNextPageParam: (lastPage) => lastPage.next
  })
}

interface RoastersProps { }

const Roasters: FC<RoastersProps> = () => {
  const [nameFilter, setNameFilter] = useState('')
  const { data, fetchNextPage, hasNextPage } = useRoastersQuery(nameFilter)

  return (
    <Box data-testid="Roasters">
      <Stack direction={'column'} spacing={2}>

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography level='h2'>Browse Roasters</Typography>
          <Input
            onChange={(event) => setNameFilter(event.target.value)}
            startDecorator={<Search />}
          ></Input>

        </Stack>
        <InfiniteScroll
          dataLength={data?.pages.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        >

          <Stack direction={'column'} spacing={1}>
            {data?.pages.flatMap(page => page.results)
              .map(roaster => (
                <Card variant='outlined' orientation='horizontal'
                  sx={{
                    bgcolor: 'neutral.softBg',
                    '&:hover': {
                      boxShadow: 'sm',
                      borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
                    },
                  }}
                >
                  <Typography>{roaster.name}</Typography>
                </Card>
              ))}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </Box>
  )
};

export default Roasters;
