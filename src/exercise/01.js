// src/exercise/01.js
import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title || "Welcome to the home page!";
  }, [title]);
};