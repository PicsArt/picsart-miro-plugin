import './buyCredits.css'

const BuyCredits = () => {
    return (
        <div>
            <button className='buy-credits' onClick={() => window.open('https://console.picsart.io/dashboard/usage/api/?type=subscription&source=miro&utm_medium=app&utm_campaign=plugins', '_blank')}>
				Buy more credits
			</button>
        </div>
    );
};

export default BuyCredits;
