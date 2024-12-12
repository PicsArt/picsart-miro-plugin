import React from 'react';
import './style.footer.css';

const Footer = () => {
  return (
    <div>
      <div style={{
        height: '1px',
        backgroundColor: '#E8E8E8',
        margin: '20px 0',
      }} />
      <div className="footer-links">
        <div style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open('https://picsart.com/developer-guidelines/', '_blank')}>Developer Guidelines</div>
        <div style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open('https://picsart.com/privacy-policy/', '_blank')}>Privacy Policy</div>
        <div style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open('https://picsart.io/trust/', '_blank')}>Trust Center</div>
        <div style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open('https://support.picsart.com/hc/en-us', '_blank')}>Help Center</div>
        <div style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.open('https://picsart.io/pricing/', '_blank')}>Pricing</div>
      </div>
      <div className="cs1 ce12 footer">
        <a href="https://picsart.com/" target="_blank" className="picsart-link">
          <img
            src="https://logos-world.net/wp-content/uploads/2023/02/Picsart-Logo.jpg"
            alt="Picsart"
            className="picsart-logo"
          />
        </a>
        <div style={{ marginTop: "5px" }}>© 2024 PicsArt, Inc.</div>
      </div>
    </div>
  );
};

export default Footer;