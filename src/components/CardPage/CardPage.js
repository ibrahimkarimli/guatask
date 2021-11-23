import {useParams, useHistory} from 'react-router-dom';
import {Grid, Button} from '@mui/material';

import Breadcrumbs  from '../Breadcrumbs';

import cards from '../../data/cards.json';

const CardPage = (props) => {
    const {cardID} = useParams();
    const history = useHistory();
    const {moreInfo} = props;
    
    const GridComponent = (data) => {
        const {name, value} = data;
        return(<>
                <Grid container>
                    <Grid item xs={1}>{name}</Grid>
                    <Grid item xs={1}>{value}</Grid>
                </Grid>
        </>)
    }


    const resultData = ((data) => {
        const {cardsData, crdID} = data
        if (cardsData){
            
            const {Content} = cardsData;
            const filteredData = Content.filter((data) => { return data["cardID"] === crdID; });
            return filteredData.length === 1 ? filteredData[0] : null;
        }
    })({cardsData: cards, crdID: cardID});

    const gotoCardTransactionsDetails = () => {
        const {location: {pathname}} = history;
        history.push(`${pathname}/transactions`);
    }

    if (resultData){
        const {cardID, cardAccount, maskedCardNumber, expireDate, currency, status, balance} = resultData;
        return(<>
            <Breadcrumbs history = {history}>
                <Grid container>
                    <GridComponent name = {"Card ID"} value = {cardID} />
                    <GridComponent name = {"Card account"} value = {cardAccount} />
                    <GridComponent name = {"Masked card number"} value = {maskedCardNumber} />
                    <GridComponent name = {"Expire date"} value = {expireDate} />
                    <GridComponent name = {"Currency"} value = {currency} />
                    <GridComponent name = {"Status"} value = {status} />
                    <GridComponent name = {"Balance"} value = {balance} />
                </Grid>
                <Grid container>
                    {moreInfo ? <Grid item><Button onClick={gotoCardTransactionsDetails}>Card transactions details</Button></Grid> : null}
                </Grid>
            </Breadcrumbs>
            
        </>)
    }

    return(<></>)
}

export default CardPage;