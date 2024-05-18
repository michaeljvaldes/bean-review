import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/joy';
import React, { FC } from 'react';
import Review from '../../models/review';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { expandUUID } from '../../services/uuid';


const getReview = async (reviewId: string) => {
  const response = await axios.get(`/reviews/${reviewId}.json`)
  const data: Review = response.data
  return data
}

const useReviewQuery = (reviewId: string) => {
  return useQuery({ queryKey: ['reviews', reviewId], queryFn: () => getReview(reviewId) })
}

interface ReviewDetailsProps { reviewId: string }

const ReviewDetails: FC<ReviewDetailsProps> = () => {
  const { shortReviewId } = useParams()
  const reviewId = expandUUID(shortReviewId ?? '')
  const query = useReviewQuery(reviewId)

  return (
    <Stack data-testid="ReviewDetails" spacing={1}>
      <Card>
        <Typography level='title-sm'>Coffee</Typography>
        <CardContent>
          <Typography level='title-lg'>{query.data?.name}</Typography>

          <Typography variant='plain' level='title-sm'>Roaster</Typography>
          <Typography variant='soft'>{query.data?.roaster}</Typography>

          <Typography variant='plain' level='title-sm'>Origin</Typography>
          <Typography variant='soft'>{query.data?.origin}</Typography>

          <Typography variant='plain' level='title-sm'>Process</Typography>
          <Typography variant='soft'>Natural, Anaerobic</Typography>
        </CardContent>
      </Card>

      <Card>
        <Typography level='title-sm'>Review</Typography>
        <CardContent>
          <Typography level='title-lg'>{query.data?.rating} {query.data?.rating === 1 ? 'Star' : 'Stars'}</Typography>

          <Typography variant='plain' level='title-sm'>Notes</Typography>
          <Typography variant='soft'>{query.data?.notes}</Typography>

          <Typography variant='plain' level='title-sm'>Reviewer</Typography>
          <Typography variant='soft'>{query.data?.owner}</Typography>
        </CardContent>
      </Card>
    </Stack>
  )
};

export default ReviewDetails;
