import {FormControl, Button} from '@mui/material';
import {useHistory} from 'react-router-dom';

const HomePage = () =>{
    const history = useHistory();

    const goToLink = (link) => {
        history.push(link);
    }

    return(<>
        <FormControl style={{width:'100%'}}>
            <FormControl><Button onClick={() => {goToLink('/home/transactions')}}>Transactions</Button></FormControl>
            <FormControl><Button onClick={() => {goToLink('/home/cards')}}>Cards</Button></FormControl>
        </FormControl>
    </>)
}

export default HomePage;