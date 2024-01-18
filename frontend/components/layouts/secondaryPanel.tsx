import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function SecondaryPanel({ children }: Readonly<Props>) {
  return (
    <div className="flex flex-col pt-12 gap-1 text-sm">
      {children}
    </div>
  );
}