import React, { useEffect } from 'react'

const InterviewAssist = () => {
  useEffect(() => {
    window.location.href = '/helper.html';
  }, []);

  return <div>Redirecting to the Interview Helper page...</div>;
}

export default InterviewAssist