import axios from 'axios';
import React, { FC } from 'react';
import Roaster from '../../models/roaster';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { expandUUID } from '../../services/uuid';
import { Card, Divider, Stack, Typography } from '@mui/joy';


const getRoaster = async (roasterId: string) => {
  const response = await axios.get(`/roasters/${roasterId}.json`)
  const data: Roaster = response.data
  return data
}

const useRoasterQuery = (roasterId: string) => {
  return useQuery({
    queryKey: ['roasters', roasterId],
    queryFn: () => getRoaster(roasterId)
  })
}

interface RoasterDetailsProps { }

const RoasterDetails: FC<RoasterDetailsProps> = () => {
  const { shortId } = useParams()
  const roasterId = expandUUID(shortId ?? '')
  const { data } = useRoasterQuery(roasterId)

  return (
    <div data-testid="RoasterDetails">
      <Stack direction={'column'} spacing={2} divider={<Divider />}>
        <Stack direction={'column'} spacing={1}>
          <Typography level='title-sm'>Roaster</Typography>
          <Typography level='title-lg'>{data?.name}</Typography>
          <Typography variant='plain' level='title-sm'>Website</Typography>
          <Typography variant='soft'>{data?.website}</Typography>
        </Stack>
        <Stack direction={'column'} spacing={1}>
          <Typography level='title-sm'>Recent reviews</Typography>
          <Stack direction={'row'} spacing={1}>
            <Card>
              3 Star
            </Card>
            <Card>
              3 Star
            </Card>
            <Card>
              3 Star
            </Card>
            <Card>
              3 Star
            </Card>
            <Card>
              3 Star
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
};

export default RoasterDetails;
