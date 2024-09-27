import React, { useEffect, useState } from 'react';
import '@/styles/components/fade_out_message.scss';

interface FadeOutMessageProps {
  props: {
    type: string;
    message: string;
  };
}

export function Fade_out_message({ props }: FadeOutMessageProps) {
  const [showMessage, setShowMessage] = useState<boolean>(true);

  useEffect(() => {
    setShowMessage(true);

    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [props.type, props.message]);

  if (!showMessage) return null;

  const className =
    {
      success: 'fade-out-success-message',
      warning: 'fade-out-warning-message',
      error: 'fade-out-error-message',
      default: 'fade-out-default-message',
    }[props.type] || 'fade-out-default-message';

  return <div className={className}>{props.message}</div>;
}
