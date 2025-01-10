import React, { useEffect } from 'react';

const Interview = () => {
  useEffect(() => {
    window.location.href = '/mock.html';
  }, []);

  return <div>Redirecting to the Interview page...</div>;
}

export default Interview;