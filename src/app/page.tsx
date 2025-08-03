'use client';

import crypto from 'crypto';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import cn from '@/util/cn';

import Button from '@/component/primitive/Button';
import TextInput from '@/component/primitive/TextInput';
import Link from '@/component/primitive/Link';

export default function Landing() {

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const handleRegister = async () => {
    setIsSending(true);

    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password: hashed }),
    });

    const data = await response.json();

    if (data.success) {
      router.push('/home');
    } else {
      setUserMessage(data.message);
    }

    setIsSending(false);
  }

  const handleLogin = async () => {
    setIsSending(true);

    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password: hashed }),
    });

    const data = await response.json();

    if (data.success) {
      router.push('/home');
    } else {
      setUserMessage(data.message);
    }

    setIsSending(false);
  }

  return (
    <div className={cn(
      'w-full h-screen',
      'flex flex-col gap-8',
      'items-center justify-center'
    )}>

      <h2 className={cn(
        'text-2xl',
      )}>
        Copy Trading @ Dash Mon[k]ey
      </h2>

      <div className={cn(
        'flex flex-col gap-4',
      )}>

        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e)}
          isDisabled={isSending}
        />

        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e)}
          type="password"
          isDisabled={isSending}
        />

        {userMessage && (
          <p className={cn(
            'text-sm text-center',
            'italic',
          )}>
            {userMessage}
          </p>
        )}

        <div className={cn(
          'w-full mt-4',
          'flex flex-row gap-4',
          'items-center justify-center',
        )}>

          <Button
            onClick={handleRegister}
          >
            Register
          </Button>

          <Button
            onClick={handleLogin}
          >
            Login
          </Button>

        </div>

      </div>

      <div className={cn(
        'fixed bottom-4 right-4'
      )}>
        <Link href="https://dashmonkey.xyz">Goto Lander</Link>
      </div>

    </div>
  );
}
