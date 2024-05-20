import React, { FC } from 'react';
import { Grid } from '@mui/joy';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import Review from '../../models/review';
import ReviewCard from '../ReviewCard/ReviewCard';
import PaginatedResponse from '../../models/paginatedResponse';
import InfiniteScroll from 'react-infinite-scroll-component';


const getReviews = async ({ pageParam }: { pageParam: string }) => {
  const response = await axios.get(`/reviews.json/?page=${pageParam}`)
  const data: PaginatedResponse<Review> = response.data
  return data
}

const useReviewsQuery = () => {
  return useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
    initialPageParam: '1',
    getNextPageParam: (lastPage) => lastPage.next,
  })
}

interface ReviewsProps { }

const Reviews: FC<ReviewsProps> = () => {
  const { data, fetchNextPage, hasNextPage } = useReviewsQuery()

  return (
    <InfiniteScroll
      dataLength={data?.pages.length ?? 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
    >
      <Grid data-testid="Reviews" container spacing={2} columns={2}>
        {data?.pages.flatMap(page => page.results)
          .map(review => (
            <Grid key={review.id} xs={1} display={'flex'} flexDirection={'column'}>
              <ReviewCard review={review}></ReviewCard>
            </Grid>
          ))
        }
      </Grid >
    </InfiniteScroll>
  )
};

export default Reviews;
