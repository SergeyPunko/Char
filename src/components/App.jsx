import { Chat } from './Chat';
import { RegisterForm } from './RegisterForm';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ChatDashboard } from './ChatDashboard';

export const App = () => {
  const { currentUser } = useCurrentUser();

  return <div className="h-full flex">{currentUser ? <ChatDashboard /> : <RegisterForm />}</div>;
};
