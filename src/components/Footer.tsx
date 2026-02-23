import '../styles/Footer.css';
import siteData from '../data/site.json';

const school = (siteData as any).schoolInfo;

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-content">
        <div className="footer-info">
          <img src={school?.logo} alt="Mateket Senior School Logo" className="footer-logo" />
          <h3>Mateket Senior School</h3>
          <address>
            {school?.location?.county}, {school?.location?.subCounty}<br />
            Kenya
          </address>
        </div>
        <div className="footer-contact">
          <p>Email: <a href={`mailto:${school?.seniorSchool?.contact?.email}`}>{school?.seniorSchool?.contact?.email}</a></p>
          <p>Phone: <a href={`tel:${school?.seniorSchool?.contact?.primaryPhone}`}>{school?.seniorSchool?.contact?.primaryPhone}</a></p>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mateket Senior School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
