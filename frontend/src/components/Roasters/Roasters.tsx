import { Search } from '@mui/icons-material';
import { Box, Card, Input, Stack, Typography } from '@mui/joy';
import { FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useRoastersQuery } from '../../services/roasters';
import { shortenUUID } from '../../services/uuid';


interface RoastersProps { }

const Roasters: FC<RoastersProps> = () => {
  const [nameFilter, setNameFilter] = useState('')
  const { data, fetchNextPage, hasNextPage } = useRoastersQuery(nameFilter)

  const navigate = useNavigate()
  const navigateToRoasterDetail = (roasterId: string) => {
    const shortRoasterId = shortenUUID(roasterId)
    navigate(`${shortRoasterId}`)
  }

  return (
    <Box data-testid="Roasters">
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography level='h2'>Browse Roasters</Typography>
          <Input
            onChange={(event) => setNameFilter(event.target.value)}
            startDecorator={<Search />}
          >
          </Input>
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
                <Card
                  key={roaster.id}
                  variant='outlined'
                  orientation='horizontal'
                  onClick={() => navigateToRoasterDetail(roaster.id)}
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
