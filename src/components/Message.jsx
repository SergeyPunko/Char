import classNames from 'classnames';
import dayjs from 'dayjs';

export const Message = ({ isExternalUser, message }) => {
  return (
    <li
      className={classNames(
        {
          'bg-primary-color !self-start before:-left-2 before:!border-primary-color before:right-auto before:-scale-x-100':
            isExternalUser,
        },
        'flex max-w-md my-2 bg-body-bg flex-wrap py-1 px-2 self-end rounded-md before:block before:border-body-bg before:absolute relative before:border-[0.45rem] before:!border-r-transparent before:!border-t-transparent before:bottom-0 before:-right-2'
      )}
    >
      <p>{message.text}</p>
      <span className=" text-secondary-text-color text-xs self-end px-1 ml-auto">
        {dayjs(message.created_at).format('hh:mm A')}
      </span>
    </li>
  );
};
