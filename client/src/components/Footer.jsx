
import { Email, LocalPhone } from "@mui/icons-material";
import "../Styles/Footer.scss";
import logo from '../assets/images/logo.png';
import payment from '../assets/images/payment.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_left">
                <a href="/"><img src={logo} alt="logo" /></a>
            </div>

            <div className="footer_center">
                <h3>Useful Links</h3>
                <ul>
                    <li>About Us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund Policy</li>
                </ul>
            </div>

            <div className="footer_right">
                <h3>Contact</h3>
                <div className="footer_right_info">
                    <LocalPhone />
                    <p>+1 234 567 890</p>
                </div>
                <div className="footer_right_info">
                    <Email />
                    <p>dreamnest@support.com</p>
                </div>
                <img src={payment} alt="payment" />
            </div>
        </div>
    )
}

export default Footer