import { Metadata } from 'next';

import { getCanonicalUrl } from '@/const/url';

import Client from './(loading)/Client';
import Redirect from './(loading)/Redirect';
import AutoDataImporter from './auto-import-config';

const Page = () => {
  return (
    <>
      <Client />
      <Redirect />
      <AutoDataImporter />
    </>
  );
};

Page.displayName = 'Loading';

export default Page;

export const metadata: Metadata = {
  alternates: { canonical: getCanonicalUrl('/') },
};
