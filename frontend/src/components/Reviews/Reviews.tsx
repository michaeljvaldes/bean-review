import React, { FC } from 'react';
import { Box, Typography } from '@mui/joy';
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
    <Box data-testid="Reviews">
      {query.data?.map(review =>
        <Typography>{review.name}</Typography>)}
    </Box>
  )
};

export default Reviews;
