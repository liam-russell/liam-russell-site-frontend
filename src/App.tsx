import './app.scss';
import { Container, Row } from 'reactstrap';
import { StoreProvider } from './Store/StoreProvider';
import Logo from './Logo';
import Skills from './Skills/List/SkillsList';


const App = () => {
    return (
        <StoreProvider>
            <Container fluid className="h-lg-100">
                <Row className="h-100">
                    <Logo />
                    <Skills />
                </Row>
            </Container>
        </StoreProvider>
    );
}

export default App;
