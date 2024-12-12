import { useState, useContext } from "react";
import { ApiKeyContext } from "../../settings/apiKeyProvider";
import './changeKey.css';

const ChangeKey = ({ handleModalClose }) => {
  const { apiKey, updateApiKey } = useContext(ApiKeyContext);
  const [error, setError] = useState("");
  const [invalidKey, setInvalidKey] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [tempApiKey, setTempApiKey] = useState('');

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
          setError('');
        } else {
          setInvalidKey(true);
          setError('Please enter a valid API key');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 style={{ fontSize: "19px" }} className="text">
          Enter your Picsart API Key
        </h3>
        <label>
          <input
            id="inp"
            className={invalidKey ? "invalidKey" : "input"}
            type="text"
            placeholder="API Key"
            value={tempApiKey}
            onChange={(e) => {
              setTempApiKey(e.target.value);
              if (!e.target.value.trim()) {
                setDisabledButton(true);
              } else {
                setDisabledButton(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            style={{borderRadius: "12px"}}
          />
          {error && <p className="error-message">{error}</p>}
        </label>
        <button
          style={{ borderRadius: "100px", color: "#FFFFFF", width: "239px", backgroundColor: "#158380", borderColor: "C209C1" }}
          className="button submit-btn"
          onClick={handleSubmit}
          disabled = {disabledButton ? true : false}
        >
          Submit
        </button>
        <div
          style={{
            fontSize: "12px",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#158380"
          }}
          onClick={() => window.open("https://console.picsart.io/dashboard/apps/")}
        >
          Get your Picsart API Key
        </div> 
        <span style={{ cursor: "pointer" }} className="icon icon-close modal-close" onClick={handleModalClose}></span>
      </div>
    </div>
  );
};

export default ChangeKey;