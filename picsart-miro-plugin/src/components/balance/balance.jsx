import { useEffect, useState, useContext } from 'react';
import { ApiKeyContext } from '../../settings/apiKeyProvider';
import axios from 'axios';
import BuyCredits from '../buyCredits/buyCredits';
import ChangeKey from '../changeKey/changeKey';
import './balance.css'

const Balance = ({credits, setCredits}) => {
    const { apiKey } = useContext(ApiKeyContext);
    const [isKeyChange, setIsKeyChange] = useState(false);

    const handleModalClose = async () => {
      setIsKeyChange(false);
    }

    const onChangeApiKey = async () => {
      setIsKeyChange(true);
    }

    useEffect(() => {
        if (apiKey) {
            const fetchBalance = async () => {
              try {
                const options = {
                  method: 'GET',
                  url: 'https://api.picsart.io/tools/1.0/balance',
                  headers: {
                    accept: 'application/json',
                    'X-Picsart-API-Key': apiKey,
                    'X-Picsart-Plugin': 'Miro'
                  }
                };
                const response = await axios.request(options);
                setCredits(response.data.credits);
              } catch (error) {
                setCredits(0);
                console.error("Error fetching balance:", error);
              }
            };

            fetchBalance();
        }
    }, [apiKey]);

    return (
        <div>
            <span className="current-balance">Current balance</span>
            <p className='upgrade-your-plan'>Upgrade your plan for more credits</p>
			<span className='credits'>{credits} credits left</span>
            <div className="buy-credits-container">
				<BuyCredits />
			</div>
            <div
              className='change-api-key-text'
              onClick={() => {
                onChangeApiKey()
              }}
            >Change API Key</div>
            {isKeyChange && (
              <ChangeKey handleModalClose={handleModalClose} />
            )}
        </div>
    );
};

export default Balance;
