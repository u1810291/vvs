import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useUtils() {
  const navigate = useNavigate();
  const backFunc = useCallback(async () => {
    navigate(-1);
  }, [navigate]);

  return { backFunc };
}

export default useUtils;
