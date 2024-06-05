import React, { FC, useState } from 'react';
import { Button, Grid, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import Review from '../../models/review';
import ReviewCard from '../ReviewCard/ReviewCard';
import PaginatedResponse from '../../models/paginatedResponse';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Add } from '@mui/icons-material';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';


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
  const [open, setOpen] = useState(false)


  return (
    <Stack data-testid="Reviews" direction={'column'} spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography level='title-md'>Latest reviews</Typography>
        <Button startDecorator={<Add />} onClick={() => setOpen(true)}>
          Add review
        </Button>
      </Stack>
      <InfiniteScroll
        dataLength={data?.pages.length ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={2} columns={2}>
          {data?.pages.flatMap(page => page.results)
            .map(review => (
              <Grid
                key={review.id}
                xs={1}
                display={'flex'}
                flexDirection={'column'}
              >
                <ReviewCard review={review}></ReviewCard>
              </Grid>
            ))
          }
        </Grid >
      </InfiniteScroll>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <CreateReviewForm onCreate={() => setOpen(false)} />
        </ModalDialog>
      </Modal>
    </Stack>
  )
};

export default Reviews;
