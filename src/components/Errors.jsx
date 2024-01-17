export const Errors = ({ errors = [] }) => {
  const filteredErrors = errors.filter((error) => error?.message);

  return (
    <ul className="flex flex-col text-red-500 absolute -bottom-10 left-1/2 -translate-x-1/2 translate-y-1/2 text-center w-full">
      {filteredErrors.map((error) => (
        <li key={error.message}>{error.message}</li>
      ))}
    </ul>
  );
};
