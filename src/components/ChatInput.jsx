import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  message: z.string(),
});

export const ChatInput = ({ onSend }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    onSend(data);
    reset();
  };

  return (
    <footer>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
        <label className=" relative flex-1">
          <input
            {...register('message')}
            autoComplete="off"
            placeholder="Message"
            className=" bg-chat-bg text-lg outline-none px-2 py-4 w-full"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-primary-color h-full px-8 py-4 self-center duration-300 transition-all active:opacity-70"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" className="fill-chat-bg" id="send">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
          </svg>
        </button>
      </form>
    </footer>
  );
};
