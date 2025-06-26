import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI Components Demo - Four Loop Digital',
  description: 'Demonstration of the Four Loop Digital UI component library',
};

export default function ComponentsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
