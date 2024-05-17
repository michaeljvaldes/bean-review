import React, { FC } from 'react';
import { Box, Card, Grid } from '@mui/joy';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Review from '../../models/review';
import ReviewCard from '../ReviewCard/ReviewCard';


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
    <Grid data-testid="Reviews" container spacing={2} columns={2}>
      {query.data?.map(review => (
        <Grid key={review.id} xs={1}>
          <ReviewCard review={review}></ReviewCard>
        </Grid>
      ))}
    </Grid>
  )
};

export default Reviews;
