"use client"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();

  // Perform the redirect
  useEffect(() => {
    router.replace('/');
  }, []);

  return null;
}
