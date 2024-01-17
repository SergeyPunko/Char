export const UserAvatar = ({ user }) => {
  const href = user.avatar;
  return (
    <div className=" h-14 w-14 bg-primary-color rounded-full flex items-center justify-center overflow-hidden relative">
      {href ? (
        <img src={href} alt="User avatar" className=" object-cover " />
      ) : (
        <span>{user.username.substring(0, 2)}</span>
      )}
    </div>
  );
};
