'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    containerRef.current =
      document.getElementById('modal-root') ?? document.body;
    setMounted(true);
  }, []);

  if (!open || !mounted || !containerRef.current) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: 16,
          minWidth: 320,
          maxWidth: '90vw',
          boxShadow: '0 6px 20px rgba(0,0,0,.2)',
        }}
      >
        {children}
      </div>
    </div>,
    containerRef.current,
  );
}
