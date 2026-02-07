import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Mateket Secondary School. All rights reserved.</p>
      </div>
    </footer>
  );
}
