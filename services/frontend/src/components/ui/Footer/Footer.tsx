import styles from './Footer.module.css';

export default function Footer() {
  const { footerSection, socialMediaFlex } = styles;

  return (
    <footer className={footerSection}>
      <div className={socialMediaFlex}>
        <div>Sofit Logo</div>
        <div>Social media items</div>
        <div>Language</div>
      </div>
      <div>
        <div className="3 div">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <div className="copyright">© 2023 Sofit GmbH</div>
      </div>
    </footer>
  );
}
