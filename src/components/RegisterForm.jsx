import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageLoader } from '../utils/image-loader';
import { useEffect, useRef } from 'react';
import { UsersSocket } from '../services/usersSocket';
import { useSelector } from 'react-redux';
import { Errors } from './Errors';
import { registrationSchema } from '../utils/registration.schema';
import { UploadFile } from './UploadFile';
import { MIN_IMG_HEIGTH, MIN_IMG_WIDTH } from '../utils/constants';

export const RegisterForm = () => {
  const socketRef = useRef();
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
    resolver: zodResolver(registrationSchema),
  });

  const saveUser = (user) => {
    const isUsernameExist = users.some((userItem) => userItem.username === user.username);
    if (!isUsernameExist) {
      socketRef.current.send(user);
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
    ImageLoader(avatar, { minHeight: MIN_IMG_HEIGTH, minWidth: MIN_IMG_WIDTH })
      .then((file) => {
        saveUser({ ...userData, avatar: file });
      })
      .catch((errorText) => {
        setError('avatar', { type: 'custom', message: errorText });
      });
  };

  useEffect(() => {
    socketRef.current = new UsersSocket();

    return () => socketRef.current?.close();
  }, []);

  const avatar = watch('avatar')?.length;

  return (
    <section className="flex flex-col items-center justify-center w-full h-full p-4">
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
        <UploadFile {...register('avatar')} />
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

        <Errors errors={[usernameError, avatarError]} />
      </form>
    </section>
  );
};
