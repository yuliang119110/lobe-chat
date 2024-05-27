'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { completeOnboarding } from './_actions';

export default function OnboardingComponent() {
  const [error, setError] = React.useState('');

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // 检查 user 对象是否存在以及是否具有 reload 方法
      if (user && typeof user.reload === 'function') {
        await user.reload();
      }
      router.push('/');
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

  // 在组件渲染之前检查用户是否已经加载和登录
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>请完成基本信息的认证</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
      >
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
