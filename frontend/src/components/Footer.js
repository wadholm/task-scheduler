import "./Footer.css";

const Footer = () => (
  <div
    className="footer text-center p-3"
  >
    <p>&copy; {new Date().getFullYear()} Copyright:{" "} Malin Wadholm</p>
    <p><a href="https://www.freepik.com/free-vector/online-document-form-digital-agreement-electronic-contract-internet-questionnaire-list-note-voting-ballot-poll-flat-design-element-concept-illustration_11668378.htm#query=task&position=31&from_view=search">
    Images by vectorjuice
    </a> on Freepik</p>
  </div>
);

export default Footer;
