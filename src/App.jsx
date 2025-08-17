import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tgTheme, setTgTheme] = useState('');
  const [tgUser, setTgUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Dynamically load Telegram WebApp SDK
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js?2';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        setIsTelegram(true);
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.ready();
        setTgTheme(window.Telegram.WebApp.themeParams.bg_color || 'default');
        setTgUser(window.Telegram.WebApp.initDataUnsafe?.user || null);
      }
    };
    // Clean up script if component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendMessage = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(message);
      alert('Message sent to Telegram!');
    }
  };

  return (
    <div style={{ background: tgTheme, minHeight: '100vh', padding: 24 }}>
      <h1>Telegram Mini App Sample</h1>
      {isTelegram && tgUser ? (
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

export default App;
