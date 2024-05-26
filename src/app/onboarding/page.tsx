'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { completeOnboarding } from './_actions';

export default function OnboardingComponent() {
  const [error, setError] = React.useState('');
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      router.push('/');
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1>请完成基本信息的认证</h1>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="companyName">公司名称</label>
          <input
            id="companyName"
            name="companyName"
            placeholder="请输入公司名称"
            required
            title="公司名称"
            type="text"
          />
        </div>

        <div>
          <label htmlFor="nickname">用户昵称</label>
          <input
            id="nickname"
            name="nickname"
            placeholder="请输入用户昵称"
            required
            title="用户昵称"
            type="text"
          />
        </div>
        {error && <p className="text-red-600">错误: {error}</p>}
        <button type="submit">提交</button>
      </form>
    </div>
  );
}
