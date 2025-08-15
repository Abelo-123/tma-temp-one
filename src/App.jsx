import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// Telegram WebApp SDK
const tg = window?.Telegram?.WebApp;

function App() {
  const [tgTheme, setTgTheme] = useState('');
  const [tgUser, setTgUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (tg) {
      tg.ready();
      setTgTheme(tg.themeParams.bg_color || 'default');
      setTgUser(tg.initDataUnsafe?.user || null);
    }
  }, []);

  const sendMessage = () => {
    if (tg) {
      tg.sendData(message);
      alert('Message sent to Telegram!');
    }
  };

  return (
    <div style={{ background: tgTheme, minHeight: '100vh', padding: 24 }}>
      <h1>Telegram Mini App Sample</h1>
      {tgUser ? (
        <div>
          <p>Welcome, {tgUser.first_name} {tgUser.last_name}</p>
          <p>User ID: {tgUser.id}</p>
        </div>
      ) : (
        <p>Not running inside Telegram WebApp</p>
      )}
      <div style={{ marginTop: 24 }}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message to send to Telegram"
        />
        <button onClick={sendMessage} style={{ marginLeft: 8 }}>
          Send to Telegram
        </button>
      </div>
      <p style={{ marginTop: 32 }}>
        This is a sample Telegram Mini App built with React and Vite.
      </p>
    </div>
  );
}

export default App
