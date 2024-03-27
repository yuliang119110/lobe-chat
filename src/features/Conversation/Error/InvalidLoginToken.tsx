import { Icon } from '@lobehub/ui';
import { Segmented } from 'antd';
import { SegmentedLabeledOption } from 'antd/es/segmented';
// import { AsteriskSquare, KeySquare, ScanFace } from 'lucide-react';
import { AsteriskSquare } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import LoginEmailForm from './LoginEmailForm';
import RegisterEmailForm from './RegisterEmailForm';
import { ErrorActionContainer } from './style';

enum Tab {
  Emaillogin = 'login',
  Emailregister = 'register',
}

interface InvalidLoginTokenProps {
  id: string;
}

const InvalidLoginToken = memo<InvalidLoginTokenProps>(({ id }) => {
  const { t } = useTranslation('error');
  const defaultTab = Tab.Emaillogin;
  const [mode, setMode] = useState<Tab>(defaultTab);

  return (
    <ErrorActionContainer>
      <Segmented
        block
        onChange={(value) => setMode(value as Tab)}
        options={
          [
            {
              icon: <Icon icon={AsteriskSquare} />,
              label: t('unlock.tabs.email'),
              value: Tab.Emaillogin,
            },
            {
              icon: <Icon icon={AsteriskSquare} />,
              label: t('unlock.tabs.register'),
              value: Tab.Emailregister,
            },
          ].filter(Boolean) as SegmentedLabeledOption[]
        }
        style={{ width: '100%' }}
        value={mode}
      />
      <Flexbox gap={24}>
        {mode === Tab.Emaillogin && <LoginEmailForm id={id} />}
        {mode === Tab.Emailregister && <RegisterEmailForm id={id} />}
      </Flexbox>
    </ErrorActionContainer>
  );
});

export default InvalidLoginToken;
