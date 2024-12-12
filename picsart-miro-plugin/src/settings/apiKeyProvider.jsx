import { createContext, useState, useEffect } from 'react';
export const ApiKeyContext = createContext();

// const configuration = miro.board.storage.collection('keys');
// const initialKey = await configuration.get('apiKey');

let configuration;
let initialKey;

(async function () {
  configuration = miro.board.storage.collection('keys');
  initialKey = await configuration.get('apiKey');
})()

export const ApiKeyProvider = ({ children }) => {

  const [apiKey, setApiKey] = useState(initialKey || '');

  useEffect(() => {
    const fetchApiKey = async () => {
      const configuration = miro.board.storage.collection('keys');
      const storedKey = await configuration.get('apiKey');
      setApiKey(storedKey || '');
    };
    fetchApiKey();
  }, []);

  const updateApiKey = async (newKey) => {
    const configuration = miro.board.storage.collection('keys');
    await configuration.set('apiKey', newKey);
    setApiKey(newKey);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, updateApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};