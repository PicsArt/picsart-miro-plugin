import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useContext } from 'react';
import './style.app.css';
import { ApiKeyProvider, ApiKeyContext } from './settings/apiKeyProvider';
import Editing from './editing/editing';
import Footer from './components/footer/footer';

import { textSize } from './constants';


const App = () => {

  const [invalidKey, setInvalidKey] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const { apiKey, updateApiKey } = useContext(ApiKeyContext);
  const [view, setView] = React.useState('home');
  const [error, setError] = React.useState('');
  const [tempApiKey, setTempApiKey] = useState(apiKey);


  React.useEffect(() => {
    if (apiKey) {
      setView('editing');
    }
  }, [apiKey]);

  const handleSubmit = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Picsart-API-Key': tempApiKey.trim()
      }
    };

    fetch('https://api.picsart.io/tools/1.0/balance', options)
      .then(res => res.json())
      .then(async (res) => {
		  if (res.credits) {
			  await updateApiKey(tempApiKey.trim());
          setInvalidKey(false);
          setView('editing');
          setError('');
        } else {
          setInvalidKey(true);
          setError('Please enter a valid API key');
        }
      })
      .catch(err => console.error(err));
	};


	return (
    <div>
      {view === 'home' && (
        <div>
          <div className="image-container cs1 ce12 centered">
            <img
              style={{ marginTop: "-40px", width: "453px" }}
              src="https://cdnblog.picsart.com/2023/12/CR3034.-Blog-reop-Change-Your-Background-In-Just-One-Tap_2-780x520.png"
              alt="removebg"
              className="image"
            />
          </div>

          <div className="cs1 ce12 text-container">
            <p style={{ fontSize: textSize.paragraphSize, marginTop: "-10px", fontWeight: textSize.paragraphWeight }} className="description text">
			Instantly remove the background from your images in just one click with our Remove Background API tool.
            </p>

            <p style={{ fontSize: textSize.referenceParagraphSize, marginTop: "-10px", display: "inline"}} className="description text-alt">
              1. To use the plugin, go to <span onClick={() => window.open('https://picsart.com/', '_blank')} style={{ color: "#C209C1", cursor: "pointer", }}>Picsart.com</span> and create a free account. <div></div>
            </p>
            <p style={{ fontSize: textSize.referenceParagraphSize, marginTop: "-10px", display: "inline" }} className="description text-alt">
              2. Go to the <span onClick={() => window.open('https://console.picsart.io', '_blank')} style={{ color: "#C209C1", cursor: "pointer", }}>API dashboard</span>, copy and past your API key here.
            </p>
          </div>
          <input
            className={invalidKey ? 'invalidKey' : 'inputKey'}
            placeholder='API Key'
            type="text"
            value={tempApiKey}
            onChange={(e) => {
              setTempApiKey(e.target.value);
              if (!e.target.value.trim()) {
                setDisabledButton(true);
              } else {
                setDisabledButton(false);
              }
            }}
            onKeyDown={(e) => { if (e.key == 'Enter') handleSubmit() }}
          />
          {error && <p style={{ paddingTop: "10px" }} className="centered error-message">{error}</p>}
          <button
            style={{ borderRadius: "100px", color: "#C209C1", width: "325px", backgroundColor: "white" }}
            className="button start-btn"
            onClick={handleSubmit}
            disabled = {disabledButton ? true : false}
          >Continue
          </button>
          <p onClick={() => window.open('https://docs.picsart.io/docs/creative-apis-get-api-key', '_blank')} className="description text" style={{ cursor: "pointer", color: "#C209C1", fontSize: "12px", marginTop: "5px", marginBottom: "-30px" }}>Learn about API Key</p>
          <div style={{ margin: '50px' }}></div>

        </div>
      )}
      { view === 'editing' && <Editing /> }
      <Footer
        context="app"
      />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApiKeyProvider>
    <App />
  </ApiKeyProvider>
);


export default App;
