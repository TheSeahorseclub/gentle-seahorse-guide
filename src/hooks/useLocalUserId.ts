import { useState, useEffect } from 'react';

const LOCAL_USER_ID_KEY = 'local_user_id';

export const useLocalUserId = (): string => {
  const [userId, setUserId] = useState<string>(() => {
    const stored = localStorage.getItem(LOCAL_USER_ID_KEY);
    if (stored) return stored;
    
    const newId = crypto.randomUUID();
    localStorage.setItem(LOCAL_USER_ID_KEY, newId);
    return newId;
  });

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_USER_ID_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_USER_ID_KEY, userId);
    }
  }, [userId]);

  return userId;
};

export const getLocalUserId = (): string => {
  const stored = localStorage.getItem(LOCAL_USER_ID_KEY);
  if (stored) return stored;
  
  const newId = crypto.randomUUID();
  localStorage.setItem(LOCAL_USER_ID_KEY, newId);
  return newId;
};
