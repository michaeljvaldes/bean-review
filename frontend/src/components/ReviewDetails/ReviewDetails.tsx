import { Box, Typography } from '@mui/joy';
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
    <Box data-testid="ReviewDetails">
      <Typography level='h3'>{query.data?.name}</Typography>
    </Box>
  )
};

export default ReviewDetails;
