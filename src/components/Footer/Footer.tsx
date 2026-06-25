import {FC} from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import {Link} from "react-router-dom";

import {Button, Container} from '../ui';
import {useContent} from '../../content';
import './footer.css';

const Footer: FC = () => {
    const currentYear = new Date().getFullYear();
    const {content} = useContent();
    const {clinic, footer, navigation} = content;

    const scrollWindow = () => {
        window.scroll({top: 0, behavior: "smooth"});
    };

    return (
        <footer className="footer">
            <Container className="footer__container" size="wide">
                <div className="footer__brand">
                    <p className="footer__eyebrow">{footer.eyebrow}</p>
                    <h2>{footer.title}</h2>
                    <p>{footer.description}</p>
                    <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} to="/#recording">
                        {footer.ctaLabel}
                    </Button>
                </div>

                <div className="footer__grid">
                    <div>
                        <h3>{footer.navigationTitle}</h3>
                        <ul>
                            {navigation.main.map(item => (
                                <li key={item.to}><Link to={item.to} onClick={scrollWindow}>{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>{footer.contactsTitle}</h3>
                        <ul className="footer__contacts">
                            <li><a href={`tel:${clinic.phone}`}><LocalPhoneOutlinedIcon fontSize="small"/>{clinic.phoneDisplay}</a></li>
                            <li><a href={`mailto:${clinic.email}`}><MailOutlineOutlinedIcon fontSize="small"/>{clinic.email}</a></li>
                            <li><PlaceOutlinedIcon fontSize="small"/>{clinic.locations[0].address}</li>
                        </ul>
                    </div>
                    <div>
                        <h3>{footer.hoursTitle}</h3>
                        <ul>
                            <li>{clinic.hours.weekdays}</li>
                            <li>{clinic.hours.saturday}</li>
                            <li>{clinic.hours.sunday}</li>
                        </ul>
                    </div>
                </div>
            </Container>

            <Container className="footer__bottom" size="wide">
                <p>© {currentYear} {footer.copyright}</p>
                <div className="footer__socials">
                    <a aria-label={`${clinic.name} у Facebook`} href={clinic.socials.facebook} rel="noreferrer" target="_blank"><FacebookIcon fontSize="small"/></a>
                    <a aria-label={`${clinic.name} в Instagram`} href={clinic.socials.instagram} rel="noreferrer" target="_blank"><InstagramIcon fontSize="small"/></a>
                    <a aria-label={`${clinic.name} у Telegram`} href={clinic.socials.telegram} rel="noreferrer" target="_blank"><TelegramIcon fontSize="small"/></a>
                </div>
            </Container>
        </footer>
    );
};

export {Footer};
