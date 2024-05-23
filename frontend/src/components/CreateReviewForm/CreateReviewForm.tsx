import { FormControl, FormLabel, Input, Stack, Textarea, Typography } from '@mui/joy';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface CreateReviewFormProps { }

const CreateReviewForm: FC<CreateReviewFormProps> = () => {
  const { control, register, handleSubmit } = useForm()
  const onSubmit = (data: any) => console.log(data)


  return (
    <div data-testid="CreateReviewForm">
      <Typography>Create review</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={1}>
          <FormControl>
            <FormLabel>name</FormLabel>
            <Input {...register('name', { required: true, maxLength: 100 })} />
          </FormControl>
          <FormControl>
            <FormLabel>origin</FormLabel>
            <Input {...register('origin', { required: false, maxLength: 20 })} />
          </FormControl>
          <FormControl>
            <FormLabel>rating</FormLabel>
            <Input type='number' {...register('rating', { required: true, min: 1, max: 5 })} />
          </FormControl>
          <FormControl>
            <FormLabel>notes</FormLabel>
            <Textarea minRows={2} {...register('notes', { required: false })} />
          </FormControl>
          <Input type='submit' />
        </Stack>
      </form>
    </div>
  )
};

export default CreateReviewForm;
