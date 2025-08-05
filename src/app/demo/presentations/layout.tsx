'use client';

import { ToastProvider } from '@/components/ui/Toast';

export default function PresentationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {/* No AppBar or navigation - direct full-screen content */}
      {children}
    </ToastProvider>
  );
}
