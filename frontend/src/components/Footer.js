import './Footer.css';

const Footer = () => (
    <div className='footer text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <p className='text-dark'>
          Malin Wadholm
        </p>
        Image by
        <a href="https://pixabay.com/users/natalliabondar-24815009/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6870584"> natalliaBondar </a>
        from
        <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6870584"> Pixabay</a>
    </div>
);

export default Footer;