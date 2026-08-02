import {FC, useEffect, useState} from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import {Link, NavLink, useLocation} from "react-router-dom";

import {Button, Container} from '../ui';
import {useContent} from '../../content';
import './header.css';

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const {content} = useContent();
    const {assets, clinic, navigation} = content;

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);

        handleScroll();
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const scrollY = window.scrollY;
        const {body} = document;
        const previousStyle = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
        };

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.overflow = 'hidden';

        return () => {
            body.style.position = previousStyle.position;
            body.style.top = previousStyle.top;
            body.style.left = previousStyle.left;
            body.style.right = previousStyle.right;
            body.style.width = previousStyle.width;
            body.style.overflow = previousStyle.overflow;
            window.scrollTo(0, scrollY);
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}>
            <Container className="site-header__container" size="wide">
                <Link aria-label={`${clinic.name}, на головну`} className="site-header__brand" to="/" onClick={closeMenu}>
                    <img src={assets.logo.src} alt={assets.logo.alt} width="50" height="50"/>
                    <span>
                        <strong><span>{navigation.brandPrefix}</span>{navigation.brandSuffix}</strong>
                        <small>{navigation.brandTagline}</small>
                    </span>
                </Link>

                <nav aria-label="Основна навігація" className="site-header__nav" id="primary-navigation">
                    {navigation.main.map(item => (
                        <NavLink
                            className={({isActive}) => `site-header__link ${isActive ? 'is-active' : ''}`}
                            key={item.to}
                            onClick={closeMenu}
                            to={item.to}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="site-header__end">
                    <div className="site-header__meta" aria-label="Швидкі контакти">
                        <span><AccessTimeOutlinedIcon fontSize="small"/>{clinic.hours.short}</span>
                        <a href={`tel:${clinic.phone}`}><LocalPhoneOutlinedIcon fontSize="small"/>{clinic.phoneDisplay}</a>
                    </div>

                    <div className="site-header__actions">
                        <a aria-label={`Написати ${clinic.name} на email`} className="site-header__icon-link" href={`mailto:${clinic.email}`}>
                            <MailOutlineOutlinedIcon fontSize="small"/>
                        </a>
                        <a aria-label={`${clinic.name} у Facebook`} className="site-header__icon-link" href={clinic.socials.facebook} rel="noreferrer" target="_blank">
                            <FacebookIcon fontSize="small"/>
                        </a>
                        <a aria-label={`${clinic.name} в Instagram`} className="site-header__icon-link" href={clinic.socials.instagram} rel="noreferrer" target="_blank">
                            <InstagramIcon fontSize="small"/>
                        </a>
                        <Button as="hash" className="site-header__cta" icon={<ArrowForwardRoundedIcon fontSize="small"/>} size="sm" to="/#recording">
                            {navigation.ctaLabel}
                        </Button>
                    </div>
                </div>

                <button
                    aria-controls="mobile-navigation"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
                    className="site-header__burger"
                    onClick={() => setIsMenuOpen(value => !value)}
                    type="button"
                >
                    <span></span>
                    <span></span>
                </button>
            </Container>

            <div className="mobile-menu" id="mobile-navigation" aria-hidden={!isMenuOpen}>
                <nav aria-label="Мобільна навігація" className="mobile-menu__nav">
                    {navigation.main.map(item => (
                        <NavLink
                            className={({isActive}) => `mobile-menu__link ${isActive ? 'is-active' : ''}`}
                            key={item.to}
                            onClick={closeMenu}
                            to={item.to}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="mobile-menu__panel">
                    <p><AccessTimeOutlinedIcon fontSize="small"/>{clinic.hours.short}</p>
                    <a href={`tel:${clinic.phone}`}><LocalPhoneOutlinedIcon fontSize="small"/>{clinic.phoneDisplay}</a>
                    <a href={`mailto:${clinic.email}`}><MailOutlineOutlinedIcon fontSize="small"/>{clinic.email}</a>
                </div>
                <div className="mobile-menu__socials">
                    <a aria-label={`${clinic.name} у Facebook`} href={clinic.socials.facebook} rel="noreferrer" target="_blank"><FacebookIcon/></a>
                    <a aria-label={`${clinic.name} в Instagram`} href={clinic.socials.instagram} rel="noreferrer" target="_blank"><InstagramIcon/></a>
                    <a aria-label={`${clinic.name} у Telegram`} href={clinic.socials.telegram} rel="noreferrer" target="_blank"><TelegramIcon/></a>
                </div>
                <Button as="hash" icon={<ArrowForwardRoundedIcon fontSize="small"/>} size="lg" to="/#recording" onClick={closeMenu}>
                    {navigation.mobileCtaLabel}
                </Button>
            </div>
        </header>
    );
};

export {Header};
