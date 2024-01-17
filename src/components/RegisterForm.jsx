import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ImageLoader } from '../utils/image-loader';
import { useEffect, useMemo, useState } from 'react';
import { UsersSocket } from '../services/usersSocket';
import { useSelector } from 'react-redux';

const schema = z.object({
  username: z
    .string()
    .min(8)
    .max(12)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/),
  avatar: z.any().optional(),
});

export const RegisterForm = () => {
  const socket = useMemo(() => new UsersSocket(), []);
  const users = useSelector((state) => state.users) || [];

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors: { username: usernameError, avatar: avatarError },
    },
    setError,
    resetField,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const saveUser = (user) => {
    const isUsernameExist = users.some((userItem) => userItem.username === user.username);
    if (!isUsernameExist) {
      socket.send(user);
      return;
    }
    setError('username', { type: 'custom', message: 'User already exists.' });
  };

  const onSubmit = (data) => {
    const id = Math.floor(new Date().getTime() * Math.random());
    const userData = { ...data, id, isActive: true };

    if (!data.avatar?.length) {
      saveUser({ ...userData, avatar: undefined });
      return;
    }

    const avatar = data.avatar[0];
    ImageLoader(avatar, { minHeight: 400, minWidth: 400 })
      .then((file) => {
        saveUser({ ...userData, avatar: file });
      })
      .catch((errorText) => {
        setError('avatar', { type: 'custom', message: errorText });
      });
  };

  useEffect(() => () => socket.close(), []);

  const avatar = watch('avatar')?.length;

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl mb-8">Registration</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-96 w-full gap-4 relative bg-tooltip-color dark:bg-transparent p-4 rounded-md"
      >
        <label className=" relative group">
          <input
            {...register('username')}
            placeholder=" "
            autoComplete="off"
            className=" bg-chat-bg rounded-md text-lg outline-none px-2 py-4 w-full peer"
          />
          <span className="absolute left-2 top-2 cursor-text -translate-y-1/2 scale-75 text-lg opacity-50 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 duration-300 transition-all origin-left">
            Username
          </span>
        </label>
        <label className="mx-auto flex items-center bg-chat-bg py-2 px-4 rounded-md group cursor-pointer hover:scale-105 duration-300 transition-all">
          <input {...register('avatar')} type="file" accept="image/*" className="hidden" />
          <svg
            className="h-8 w-8 fill-main-text mr-4 group-active:opacity-70 group-active:scale-90 duration-300 transition-all"
            viewBox="0 0 512 512"
          >
            <g data-name="1" id="_1">
              <path d="M324.3,387.69H186a15,15,0,0,1-15-15V235.8H114.81a15,15,0,0,1-11.14-25.05L244,55.1a15,15,0,0,1,22.29,0L406.6,210.75a15,15,0,0,1-11.14,25.05H339.3V372.69A15,15,0,0,1,324.3,387.69ZM201,357.69H309.3V220.8a15,15,0,0,1,15-15h37.44L255.13,87.55,148.53,205.8H186a15,15,0,0,1,15,15Z" />
              <path d="M390.84,452.15H119.43a65.37,65.37,0,0,1-65.3-65.3V348.68a15,15,0,0,1,30,0v38.17a35.34,35.34,0,0,0,35.3,35.3H390.84a35.33,35.33,0,0,0,35.29-35.3V348.68a15,15,0,1,1,30,0v38.17A65.37,65.37,0,0,1,390.84,452.15Z" />
            </g>
          </svg>
          <span className="group-active:opacity-70 duration-300 transition-all">Upload avatar</span>
        </label>
        <div className="flex justify-center items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-primary-color rounded-md py-2 px-8 self-center hover:scale-105 duration-300 transition-all active:opacity-70"
          >
            Sign Up
          </button>

          {!!avatar && (
            <div onClick={() => resetField('avatar')} className="bg-red-500 rounded-md py-2 px-4 cursor-pointer">
              X
            </div>
          )}
        </div>

        {(usernameError || avatarError) && (
          <ul className="flex flex-col text-red-500 absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-1/2 text-center">
            {usernameError && <li>{usernameError.message}</li>}
            {avatarError && <li>{avatarError.message}</li>}
          </ul>
        )}
      </form>
    </section>
  );
};
