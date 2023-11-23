import styles from './Footer.module.css';

export default function Footer() {
  const { footerSection } = styles;

  return (
    <footer className={footerSection}>
      <div className="copyright">© 2023 ❤︎ Sofit ❤︎</div>
    </footer>
  );
}
