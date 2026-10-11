import {
  FiGlobe,
  FiGithub,
  FiCodepen,
  FiLinkedin,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiHeart,
  FiCoffee,
  FiCircle,
} from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";
const links = [
  ["Portfolio", "https://www.ashishranjan.net", FiGlobe],
  ["GitHub", "https://github.com/a2rp", FiGithub],
  ["CodePen", "https://codepen.io/ash1198", FiCodepen],
  ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin],
  ["Facebook", "https://www.facebook.com/theash.ashish/", FiFacebook],
  [
    "YouTube",
    "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
    FiYoutube,
  ],
  ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
  ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
  ["Buy Me a Coffee", "https://buymeacoffee.com/ashishranjan", FiCoffee],
  ["Patreon", "https://www.patreon.com/ashishranjan", FiCircle],
  [
    "Source code",
    "https://github.com/a2rp/insurance-broker-workspace",
    FiGithub,
  ],
];
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <img src="/insurance-broker-workspace/logo.png" alt="" />
        <span>
          © {new Date().getFullYear()}{" "}
          <a href="https://www.ashishranjan.net">Ashish Ranjan</a>. All rights
          reserved.
        </span>
      </div>
      <div className={styles.links}>
        {links.map(([label, url, Icon]) => (
          <a
            key={label}
            href={url}
            target={url.startsWith("mailto:") ? "_self" : "_blank"}
            rel="noreferrer"
            aria-label={label}
            data-tooltip-id="footer-tip"
            data-tooltip-content={label}
          >
            <Icon />
          </a>
        ))}
      </div>
      <Tooltip id="footer-tip" className={styles.tooltip} />
    </footer>
  );
};

export default Footer;
