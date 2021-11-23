import {BrowserRouter as Router, Route} from 'react-router-dom';

import TransactionsPage from "../TransactionsPage";
import TransactionPage from "../TransactionPage";
import CardsPage from '../CardsPage';
import CardPage from '../CardPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

const MainPage = () =>{

    return(<>
            <Router> 
                    <Route path="/" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/home" exact>
                        <HomePage />
                    </Route>
                    <Route path="/home/transactions" exact>
                        <TransactionsPage />
                    </Route>
                    <Route path="/home/transactions/:transID" exact>
                        <TransactionPage moreInfo = {true} />
                    </Route>
                    <Route path="/home/transactions/:transID/:cardID" exact>
                        <CardPage moreInfo = {false} />
                    </Route>
                    <Route path="/home/cards" exact>
                        <CardsPage />
                    </Route>
                    <Route path="/home/cards/:cardID" exact>
                        <CardPage moreInfo = {true} />
                    </Route>
                    <Route path="/home/cards/:cardID/transactions" exact>
                        <TransactionsPage />
                    </Route>
                    <Route path="/home/cards/:cardID/transactions/:transID" exact>
                        <TransactionPage moreInfo = {false} />
                    </Route>
            </Router>

            
        </>)
}

export default MainPage;