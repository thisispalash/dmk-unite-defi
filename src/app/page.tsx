'use client';

import { useState } from 'react';

import cn from '@/util/cn';

import { useAuth } from '@/context/AuthContext';

import Button from '@/component/primitive/Button';
import TextInput from '@/component/primitive/TextInput';
import Link from '@/component/primitive/Link';

export default function Landing() {

  const { login, register, isLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
    } catch (error: any) {
      setUserMessage(error.message);
    }
  }

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error: any) {
      setUserMessage(error.message);
    }
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
          isDisabled={isLoading}
        />

        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e)}
          type="password"
          isDisabled={isLoading}
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
            isDisabled={isLoading}
          >
            Register
          </Button>

          <Button
            onClick={handleLogin}
            isDisabled={isLoading}
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
