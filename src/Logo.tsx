import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Col } from "reactstrap";
import logo from './logo.svg'

const links = [
    {
        url: 'https://github.com/liam-russell',
        icon: faGithub,
        color: '#333',
        name: 'GitHub'
    },
    {
        url: 'https://www.linkedin.com/in/liam-russell/',
        icon: faLinkedin,
        color: '#0077b5',
        name: 'LinkedIn'
    },
    {
        url: 'https://www.google.com.au/maps/place/Brisbane+QLD',
        icon: faLocationArrow,
        color: '#ea4335',
        name: 'Brisbane (and remote)'
    }
];

const Logo = () => <Col lg={4} className="my-auto pt-3 pt-3 px-lg-5 pt-lg-5 pb-0 pb-lg-5">
    <Card>
        <CardBody>
            <img alt='logo' style={{ maxWidth: '100%' }} src={logo} />
            <hr className='m-0' />
            <div className='d-flex'>
                <ul className="nav mx-auto">
                    {links.map(link => <li className='m-2' key={link.name}>
                        <a target='_blank' rel="noopener noreferrer" href={link.url}>
                            <FontAwesomeIcon className='mr-1' icon={link.icon} style={{ color: link.color }} />
                            {link.name}
                        </a>
                    </li>)}
                </ul>
            </div>
        </CardBody>
    </Card>
</Col>;

export default Logo;