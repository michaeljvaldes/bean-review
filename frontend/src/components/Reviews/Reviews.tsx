import React, { FC } from 'react';
import { Card, Grid } from '@mui/joy';
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
    <Grid data-testid="Reviews" container spacing={2}>
      {query.data?.flatMap((_, i, a) => i % 2 ? [] : [a.slice(i, i + 2)])
        .map(reviewPair =>
        (<>
          <Grid xs={6}>
            <ReviewCard review={reviewPair[0]}></ReviewCard>
          </Grid>
          <Grid xs={6}>
            {reviewPair.length > 1 && (<ReviewCard review={reviewPair[1]}></ReviewCard>)}
          </Grid>
        </>
        ))}
    </Grid>
  )
};

export default Reviews;
