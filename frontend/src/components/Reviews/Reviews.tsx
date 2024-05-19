import React, { FC, useState } from 'react';
import { Grid } from '@mui/joy';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Review from '../../models/review';
import ReviewCard from '../ReviewCard/ReviewCard';
import PaginatedResonse from '../../models/paginatedResponse';


const PAGE_SIZE = 100

const getReviews = async (limit = PAGE_SIZE) => {
  const response = await axios.get(`/reviews.json/?limit=${limit}`)
  const data: PaginatedResonse<Review> = response.data
  return data
}

const useReviewsQuery = (limit: number) => {
  return useQuery({ queryKey: ['reviews', limit], queryFn: () => getReviews(limit) })
}

interface ReviewsProps { }

const Reviews: FC<ReviewsProps> = () => {
  const [limit, setLimit] = useState(PAGE_SIZE)
  const query = useReviewsQuery(limit)

  return (
    <Grid data-testid="Reviews" container spacing={2} columns={2}>
      {query.data?.results.map(review => (
        <Grid key={review.id} xs={1} display={'flex'} flexDirection={'column'}>
          <ReviewCard review={review}></ReviewCard>
        </Grid>
      ))
      }
    </Grid >
  )
};

export default Reviews;
