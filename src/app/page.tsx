'use client';

import { useState } from 'react';

import cn from '@/util/cn';

import Button from '@/component/primitive/Button';
import TextInput from '@/component/primitive/TextInput';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/component/primitive/Tooltip';
import Link from '@/component/primitive/Link';

export default function Landing() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const handleRegister = () => {
    console.log('Register');
    setUserMessage('Registering...');
  }

  const handleLogin = () => {
    console.log('Login');
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
        />

        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e)}
          type="password"
        />

        {userMessage && (
          <p className={cn(
            'text-sm text-foreground',
            'text-center',
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
        <Link href="https://www.dashmonkey.xyz">Go home</Link>
      </div>

    </div>
  );
}
