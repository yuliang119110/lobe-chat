import { Button, Input } from 'antd';
// import { Button, Input, Select, Space } from 'antd';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';

// import { useGlobalStore } from '@/store/global';
import { FormAction } from './style';

// import { FormAction,useStyles } from './style';

// import { createClient } from '@supabase/supabase-js';

interface LoginEmailFormProps {
  id: string;
}

// const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

type ButtonTextKeys =
  | 'unlock.email.loginagain'
  | 'pluginSettings.title'
  | 'unlock.email.login' /* ... 其他键 ... */;

const LoginEmailForm = memo<LoginEmailFormProps>(({ id }) => {
  const { t } = useTranslation('error');
  //   const [setEmailUserInfo ] = useGlobalStore((s) => [
  //     s.setEmailUserInfo, // 添加这一行
  //   ]);
  const [resend, deleteMessage] = useChatStore((s) => [s.internalResendMessage, s.deleteMessage]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonTextKey, setButtonTextKey] = useState<ButtonTextKeys>('unlock.email.login');
  const [shake, setShake] = useState(false);

  const handleLogin = async (email: string, password: string, id: string) => {
    console.log('ID:', id); // 打印 id
    if (!email || !password) {
      console.error('Email or password is undefined');
      return;
    }
    const response = await fetch('/api/chat/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error('Network response was not ok');
      setButtonTextKey('unlock.email.loginagain');
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
        title={t('unlock.email.title')}
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

export default LoginEmailForm;

// const { data, error } = await supabaseClient.auth.signInWithPassword({
//   email: email,
//   password: password,
// });

// if (error) {
//   console.error('Error signing up:', error);
// } else {
//   console.log('Signed up:', data);
//   // resend(id);
//   // deleteMessage(id);

//   try {
//     // const result = await setEmailUserInfo({ AccessToken: data.session.access_token, RefreshToken: data.session.refresh_token });
//     // console.log('Result:', result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
