'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;

  labelledById?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  labelledById,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    containerRef.current =
      document.getElementById('modal-root') ?? document.body;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open || !mounted || !containerRef.current) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="presentation"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    containerRef.current,
  );
}
