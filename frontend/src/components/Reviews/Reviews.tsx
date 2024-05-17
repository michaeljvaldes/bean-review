import React, { FC } from 'react';
import { Box, Card, Grid, Typography } from '@mui/joy';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Review = {
  id: string,
  name: string,
  year: number,
  origin: string,
  rating: number,
  notes: string,
  roaster: string,
  owner: string
}

const getReviews = async () => {
  const response = await axios.get('/reviews.json')
  const data: Review[] = response.data
  return data
}

const useReviewsQuery = () => {
  return useQuery({ queryKey: ['reviews'], queryFn: getReviews })
}


interface ReviewsProps { }

const Reviews: FC<ReviewsProps> = () => {
  const query = useReviewsQuery()

  return (
    <Grid data-testid="Reviews" container spacing={2}>
      {query.data?.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)])
        .map(reviewPair =>
        (<>
          <Grid xs={6}>
            <Card>{reviewPair[0].name}</Card>
          </Grid>
          <Grid xs={6}>
            {reviewPair.length > 1 && (<Card>{reviewPair[1].name}</Card>)}
          </Grid>
        </>
        ))}
    </Grid>
  )
};

export default Reviews;
