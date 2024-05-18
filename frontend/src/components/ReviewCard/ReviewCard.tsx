import React, { FC } from 'react';
import Review from '../../models/review';
import { Button, ButtonGroup, Card, CardActions, CardContent, Stack, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { shortenUUID } from '../../services/uuid';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';


interface ReviewCardProps { review: Review }

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const navigate = useNavigate()
  const navigateToReviewDetail = () => {
    const shortReviewId = shortenUUID(review.id)
    navigate(`${shortReviewId}`)
  }

  return (
    <Card data-testid="ReviewCard" variant='soft' sx={{ height: '100%' }}>
      <Stack direction={'column'}></Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography level='h3'>{review.name}</Typography>
        <Typography level='h4'>{review.rating} {review.rating === 1 ? 'Star' : 'Stars'} </Typography>
      </Stack>
      <CardContent>
        <Typography
          startDecorator={<BusinessIcon />}
          level='body-md'>
          {review.roaster.name}
        </Typography>
        <Typography
          startDecorator={<PublicIcon />}
          level='body-md'>
          {review.origin}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography
            startDecorator={<PersonIcon />}
            level='body-md'>
            {review.owner}
          </Typography>
          <Typography level='body-sm'>{review.year}</Typography>
        </Stack>
      </CardContent>
      <CardActions buttonFlex={1}>
        <ButtonGroup>
          <Button onClick={() => navigateToReviewDetail()}>View</Button>
          <Button>Bookmark</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
};

export default ReviewCard;
