import {Button, FormControl} from '@mui/material';
import {useHistory} from 'react-router-dom';

const LoginPage = () =>{
    const history = useHistory();

    const goToLink = (link) => {
        history.push(link);
    }
    return(<>
    <FormControl style={{width:'100%'}}>
        <Button  onClick={() => {goToLink('/home')}} >
            Login
        </Button>
    </FormControl>
        
    </>)
}

export default LoginPage;