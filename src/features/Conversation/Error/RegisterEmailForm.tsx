import { Button, Input } from 'antd';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';

import { FormAction } from './style';

interface RegisterEmailFormProps {
  id: string;
}

const RegisterEmailForm = memo<RegisterEmailFormProps>(({ id }) => {
  const { t } = useTranslation('error');

  const [resend, deleteMessage] = useChatStore((s) => [s.internalResendMessage, s.deleteMessage]);
  const [buttonTextKey, setButtonTextKey] = useState<ButtonTextKeys>('unlock.email.register');
  const [shake, setShake] = useState(false);
  type ButtonTextKeys =
    | 'unlock.email.registeragain'
    | 'pluginSettings.title'
    | 'unlock.email.register' /* ... 其他键 ... */;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (email: string, password: string, id: string) => {
    console.log('ID:', id); // 打印 id
    if (!email || !password) {
      console.error('Email or password is undefined');
      return;
    }
    const response = await fetch('/api/chat/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error('Network response was not ok');
      setButtonTextKey('unlock.email.registeragain');
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
      return;
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not a valid JSON');
      return;
    }

    const data = await response.json();
    console.log('Data:', data); // 打印 data

    if (data.message === 'Logged in successfully') {
      // 登录成功，执行 resend 和 deleteMessage
      resend(id);
      deleteMessage(id);
    }
  };

  return (
    <>
      <FormAction
        avatar={'🗳'}
        description={t('unlock.email.description')}
        title={t('unlock.email.titleregister')}
      >
        <Input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('unlock.email.placeholder')}
          value={email}
        />
        <Input.Password
          autoComplete={'new-password'}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('unlock.email.placeholder')}
          type={'block'}
          value={password}
        />
      </FormAction>
      <Flexbox gap={12}>
        <Button
          onClick={async () => {
            handleLogin(email, password, id);
          }}
          style={
            shake
              ? {
                  animation: 'shake 0.1s',
                  animationIterationCount: '5',
                  transform: 'translate(1px, 1px) rotate(0deg)',
                }
              : {}
          }
          type={'primary'}
        >
          {t(buttonTextKey)}
        </Button>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          {t('unlock.closeMessage')}
        </Button>
      </Flexbox>
    </>
  );
});

export default RegisterEmailForm;
