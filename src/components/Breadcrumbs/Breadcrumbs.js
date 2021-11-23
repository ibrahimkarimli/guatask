import {Link} from 'react-router-dom';
import {Grid} from '@mui/material';

const Breadcrumbs = (props) => {
    
    const {history, children} = props;
    const {location: {pathname}} = history;
    
    const Links = () => {
        return pathname.split('/').slice(1).map((data, index, arr) => {
            const link = arr.filter((data, i) => { return index + 1  > i  }).join('/');
            return index < arr.length - 1 ? <Link key={index} to={`/${link}`}>/{data}</Link> : <label key={index}>/{data}</label>});
    }
    
    return(<>
        <Grid container spacing={6}>
            <Grid style={{textAlign:"center", marginTop:20}} item xs={12}>
                <Links />
            </Grid>
            <Grid item xs={12}>
                    {children}
            </Grid>
        </Grid>
        
    </>)
}

export default Breadcrumbs;