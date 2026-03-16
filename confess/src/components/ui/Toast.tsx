'use client';

import { Toaster, toast as hotToast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export const Toast = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName="p-4"
      toastOptions={{
        custom: {
          duration: 4000,
          style: {
            background: 'rgba(5, 5, 10, 0.9)',
            color: '#00ffe1',
            border: '2px solid #00ffe1',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            fontFamily: '"DM Mono", monospace',
          },
        },
      }}
    />
  );
};

// Helper function to show toast notifications
export const showToast = {
  success: (message: string) =>
    hotToast.success(message, {
      style: {
        background: 'rgba(5, 5, 10, 0.9)',
        color: '#00ffe1',
        border: '2px solid #00ffe1',
      },
    }),
  error: (message: string) =>
    hotToast.error(message, {
      style: {
        background: 'rgba(5, 5, 10, 0.9)',
        color: '#ff3d00',
        border: '2px solid #ff3d00',
      },
    }),
  loading: (message: string) =>
    hotToast.loading(message, {
      style: {
        background: 'rgba(5, 5, 10, 0.9)',
        color: '#00ffe1',
        border: '2px solid #00ffe1',
      },
    }),
};
