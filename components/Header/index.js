import Link from 'next/link';
import classNames from "classnames";

import { Component } from 'react';
import Logo from '../Logo';


class Header extends Component {
    static defaultProps = {
        nav: {
            active: ''
        }
    }

    state = {
        activeToggleNav: false
    }

    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this)
    }


    /**
     * Toggle menu
     */
    toggleMenu() {
        this.setState(prevState => ({
            activeToggleNav: !prevState.activeToggleNav
        }))
    }

    render() {
        const { activeToggleNav } = this.state;

        return (
            <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item is-vcentered" href="/">
                        <Logo variant="onDark" height={22} />
                    </Link>

                    <a role="button" className={classNames('navbar-burger', { 'is-active': activeToggleNav })}
                        aria-label="menu" aria-expanded="false"
                        data-target="navbarBasicExample" onClick={this.toggleMenu}>
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div id="navbarMain" className={classNames('navbar-menu', { 'is-active': activeToggleNav })}>
                    <div className="navbar-start">

                    </div>

                    <div className="navbar-end">
                        <Link href="/development" className={classNames("navbar-item", { "is-active": this.props.nav?.active === 'development' })}>
                            Développement
                        </Link>

                        <Link href="/contact" className={classNames("navbar-item", { "is-active": this.props.nav.active === 'contact' })}>
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}




export default Header
