import { Container} from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

function ChooseService(){
    return(<>
    <Navbar className='bg-d'data-bs-theme='light'>
        <Container>
            <Navbar.Text >
                CHOOSE A SERVICE 
            </Navbar.Text>  
        </Container>
    </Navbar>
    <Container fluid>
        
    </Container>
    </>)
}

export {ChooseService}