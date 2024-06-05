import { Autocomplete, AutocompleteOption, FormControl, FormLabel, Input, ListItemContent, Stack, Textarea, Typography } from '@mui/joy';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Review from '../../models/review';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoastersQuery } from '../../services/roasters';
import { useCurrentUserContext } from '../CurrentUserContext/CurrentUserContext';
import Roaster from '../../models/roaster';


const postReview = (review: SubmitValues, token: string | null) => {
  return axios.post<Review>(
    '/reviews/',
    review,
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
}

type FormValues = {
  name: string,
  roaster: Roaster | null,
  year: number,
  origin: string,
  rating: number,
  notes: string
}

type SubmitValues = {
  name: string,
  roaster: string,
  year: number,
  origin: string,
  rating: number,
  notes: string
}

interface CreateReviewFormProps { onCreate: () => void }

const CreateReviewForm: FC<CreateReviewFormProps> = ({ onCreate }) => {
  const { auth } = useCurrentUserContext()
  const [nameFilter, setNameFilter] = useState('')
  const { data } = useRoastersQuery(nameFilter)
  const queryClient = useQueryClient()
  const createReviewMutation = useMutation({
    mutationFn: (review: SubmitValues) => postReview(review, auth.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      onCreate()
    }
  })
  const { register, control, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitData: SubmitValues = { ...data, roaster: data.roaster?.id ?? '' }
    return createReviewMutation.mutate(submitData)
  }

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
            <FormLabel>roaster</FormLabel>
            <Controller
              name='roaster'
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={({ field: { value, onChange, ...props } }) => (
                <Autocomplete
                  inputValue={nameFilter}
                  onInputChange={(_e, newValue) => setNameFilter(newValue)}
                  value={value}
                  onChange={(_e, newValue) => onChange(newValue)}
                  options={data?.pages.flatMap(page => page.results) ?? []}
                  getOptionKey={option => option.id}
                  getOptionLabel={option => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderOption={(props, roaster) => (
                    <AutocompleteOption {...props} key={roaster.id}>
                      <ListItemContent>{roaster.name}</ListItemContent>
                    </AutocompleteOption>
                  )}
                  {...props}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>year</FormLabel>
            <Input type='number' defaultValue={new Date().getFullYear()} {...register('year', { required: true })} />
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
