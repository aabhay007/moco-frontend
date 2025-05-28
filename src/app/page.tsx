// src/app/page.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AuthPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
        <Image src={session.user?.image ?? ''} alt="avatar" width={80} height={80} style={{ borderRadius: '50%', marginBottom: 16 }} />
        <h2>Welcome, {session.user?.name || session.user?.email}!</h2>
        <button onClick={() => signOut()} style={{ marginTop: 24, padding: '8px 24px', fontSize: 16 }}>Sign out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Sign in to continue</h2>
      <button
        onClick={() => signIn('google')}
        style={{ marginTop: 24, padding: '8px 24px', fontSize: 16, background: '#4285F4', color: '#fff', border: 'none', borderRadius: 4 }}
      >
        Sign in with Google
      </button>
    </div>
  );
}