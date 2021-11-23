import {useHistory, useParams} from 'react-router-dom';

import TableComponent from '../TableComponent';
import  Breadcrumbs  from '../Breadcrumbs';
import transactions from '../../data/transactions.json';


const searchParams =  Object();
const savedContent = Object();

const TransactionsPage = () => {

        const history = useHistory();
        const params = useParams();  
     
        const filteredTransactions = ((data) => {
             const {params, transactions} = data; 

             if (params){
                const assignTransaction = Object.assign({}, transactions);
                const {cardID} = params;
                const {Content} = assignTransaction;
                if (cardID){
                   const filteredData = Content.filter((data) => { return data["cardID"] === cardID });
                   assignTransaction["Content"] = filteredData;
                    return assignTransaction;
                }

                return transactions;
             }
             
         })({params: params, transactions: transactions});


        return(
            <>
                <Breadcrumbs history = {history}>
                    <TableComponent savedContent = {savedContent} onClickIDValue="transactionID" searchParams = {searchParams} content = {filteredTransactions} />
                </Breadcrumbs>
                
            </>
        )
}

export default TransactionsPage;