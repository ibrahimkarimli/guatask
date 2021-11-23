import {useHistory} from 'react-router-dom';

import Breadcrumbs  from '../Breadcrumbs';
import TableComponent from '../TableComponent';

import data from '../../data/cards.json';

const searchParams = Object();
const savedContent = Object();

const CardsPage = () => {

        const history = useHistory();

        return(
            <>
                <Breadcrumbs history = {history}>
                    <TableComponent savedContent = {savedContent} onClickIDValue="cardID" searchParams = {searchParams} content = {data} />
                </Breadcrumbs>
                
            </>
        )
}

export default CardsPage;