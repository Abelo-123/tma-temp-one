import { useEffect, useState } from 'react';
import {
  Button,
  Section,
  Text,
  Input,
  List,
  Spinner,
  Switch,
  Checkbox,
  Radio,
  Modal
} from '@telegram-apps/telegram-ui';
import './App.css';

function App() {
  const [tgTheme, setTgTheme] = useState('');
  const [tgUser, setTgUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isTelegram, setIsTelegram] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  // Removed useTheme, not available in @telegram-apps/telegram-ui

  // Load Telegram SDK only once and provide a reusable getter
  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
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
    } else {
      setIsTelegram(true);
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
      setTgTheme(window.Telegram.WebApp.themeParams.bg_color || 'default');
      setTgUser(window.Telegram.WebApp.initDataUnsafe?.user || null);
    }
  }, []);

  // Reusable getter for Telegram WebApp
  const getTelegramWebApp = () => {
    return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  };

  const sendMessage = () => {
    const tg = getTelegramWebApp();
    if (tg) {
      tg.sendData(message);
      alert('Message sent to Telegram!');
    }
  };

  return (
  <Section style={{ background: tgTheme || '#fff', minHeight: '100vh', padding: 24 }}>
      <Text variant="title" style={{ marginBottom: 16 }}>Telegram Mini App Sample</Text>
      {isTelegram && tgUser ? (
        <Section>
          <Text variant="subtitle">Welcome, {tgUser.first_name} {tgUser.last_name}</Text>
          <Text>User ID: {tgUser.id}</Text>
        </Section>
      ) : (
        <Text>Not running inside Telegram WebApp</Text>
      )}
      <Section style={{ marginTop: 24 }}>
        <Input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message to send to Telegram"
        />
        <Button onClick={sendMessage} style={{ marginLeft: 8 }}>
          Send to Telegram
        </Button>
      </Section>
      <Section style={{ marginTop: 24 }}>
        <Text variant="subtitle">Telegram UI Components Demo</Text>
  <List items={["List Item 1", "List Item 2"]} />
        <Spinner />
        <Switch checked={switchOn} onChange={() => setSwitchOn(!switchOn)} label="Switch" />
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} label="Checkbox" />
        <Radio checked={radioValue === '1'} onChange={() => setRadioValue('1')} label="Radio 1" />
        <Radio checked={radioValue === '2'} onChange={() => setRadioValue('2')} label="Radio 2" />
        <Button onClick={() => setShowModal(true)} style={{ marginTop: 8 }}>Show Modal</Button>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Section>
            <Text variant="title">Telegram Modal</Text>
            <Text>This is a modal dialog using Telegram UI.</Text>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </Section>
        </Modal>
      </Section>
      <Text style={{ marginTop: 32 }}>
        This is a sample Telegram Mini App built with React, Vite, and Telegram UI.
      </Text>
    </Section>
  );
}

export default App;
