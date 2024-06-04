import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Stack } from '@mui/joy';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useCurrentUserContext } from '../CurrentUserContext/CurrentUserContext';


type LoginInfo = {
  username: string,
  password: string
}

interface LoginProps { }

const Login: FC<LoginProps> = () => {
  const { setAuth } = useCurrentUserContext()
  const postLogin = async (newLogin: LoginInfo) => {
    const response = await axios.post('/api/auth/login/', newLogin)
    return response.data
  }

  const loginMutation = useMutation({
    mutationFn: (newLogin: LoginInfo) => postLogin(newLogin),
    onSuccess: (data) => {
      setAuth({ token: data['token'], currentUserId: data['user']['id'] })
    },
  })
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => loginMutation.mutate(data)


  return (
    <div data-testid="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={1}>
          <FormControl>
            <FormLabel>username</FormLabel>
            <Input {...register('username', { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input {...register('password', { required: true })} />
          </FormControl>
          <Input type='submit' />
        </Stack>
      </form>
    </div>
  )
};

export default Login;
