import './errorMessage.css'

const ErrorMessage = ({message}) => {
	return (
		<div>
			<span className='error-message'>
				{message}
			</span>
		</div>
	);
};

export default ErrorMessage;
