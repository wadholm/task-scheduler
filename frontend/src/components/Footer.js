import './Footer.css';

const Footer = () => (
    <div className='footer text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <p className='text-dark'>
          Malin Wadholm
        </p>
    </div>
);

export default Footer;