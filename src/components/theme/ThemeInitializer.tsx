'use client';

import { useEffect } from 'react';
import { applyTheme, getPreferredTheme } from '@/lib/theme';

export default function ThemeInitializer() {
  useEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  return null;
}

