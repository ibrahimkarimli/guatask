import {useParams, useHistory} from 'react-router-dom';
import {Grid, Button} from '@mui/material';

import Breadcrumbs  from '../Breadcrumbs';

import transactions from '../../data/transactions.json';

const GridComponent = (data) => {
    const {name, value} = data;
    return(<>
            <Grid container>
                <Grid item xs={1}>{name}</Grid>
                <Grid item xs={1}>{value}</Grid>
            </Grid>
    </>)
}

const TransactionPage = (props) => {
    const params = useParams();
    const history = useHistory();
    const {moreInfo} = props;

    const resultData = ((data) => {
        const {transactionsData, params} = data
        if (transactionsData){
            const {transID} = params
            const {Content} = transactionsData;
            const filteredData = Content.filter((data) => { return data["transactionID"] === transID; });
            return filteredData.length === 1 ? filteredData[0] : null;
        }
    })({transactionsData: transactions, params: params});

    const gotoCardDetails = (data) => {
        const {cardID} = data;
        const {location: {pathname}} = history;
        history.push(`${pathname}/${cardID}`);
    }

    if (resultData){
        const {amount, cardAccount, cardID, currency, merchantInfo, transactionDate, transactionID} = resultData;
        return(<>
            <Breadcrumbs history = {history}>
                <Grid container>
                    <GridComponent name = {"Amount"} value = {amount} />
                    <GridComponent name = {"Card account"} value = {cardAccount} />
                    <GridComponent name = {"Card ID"} value = {cardID} />
                    <GridComponent name = {"Currency"} value = {currency} />
                    <GridComponent name = {"Merchant info"} value = {merchantInfo} />
                    <GridComponent name = {"Transaction date"} value = {transactionDate} />
                    <GridComponent name = {"Transaction ID"} value = {transactionID} />
                </Grid>
                <Grid container>
                    {moreInfo ? <Grid item><Button onClick={() => gotoCardDetails({cardID: cardID})}>Transaction card details</Button></Grid> : null}
                </Grid>
            </Breadcrumbs>
        </>)
    }

    return(<></>)
}

export default TransactionPage;