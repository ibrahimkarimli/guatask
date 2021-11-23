import {Link} from 'react-router-dom';
import {TableRow, TableCell, TableHead, Button, TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material';


export const PaginationComponent = (data) => {
    const {pageCount, nextPage, prevPage, currPage} = data;

    if (pageCount > 10){
        
        const nextCountCalc = currPage === 1 ? 10 : ((currPage - 1) * 10) + 10;
        const nextCount = nextCountCalc < pageCount ? nextCountCalc : pageCount;
        const prevCount = ((currPage - 1) * 10) + 1;

        return(<>
                <Button disabled={currPage === 1 ? true : false} onClick={prevPage}>{`<`}</Button>
                     <label>{prevCount} - {nextCount} from {pageCount}</label>
                <Button disabled={nextCountCalc > pageCount ? true : false} onClick={nextPage}>{`>`}</Button>
            </>)
    }
    return(<></>);
};

export const FilterComponent = (data) => {
    const {content, componentKey, contentFilter, searchParams} = data;
    const {placeholder,  filterElement, filterElementContent} = content
    

        switch(filterElement){
            case "input":
                return(<>
                        <TextField defaultValue={searchParams[componentKey]} name={componentKey} id={componentKey} label={placeholder} variant="outlined"  onKeyUp={contentFilter}/>
                    </>)

            case "combo":
                return(<>
                        <FormControl>
                            <InputLabel htmlFor={componentKey}>{placeholder}</InputLabel>
                            <Select inputProps={{name:componentKey, id:componentKey}} id={componentKey} value={componentKey} labelId={componentKey} label={placeholder} onChange={contentFilter}>
                                {filterElementContent.map((data, index) => {
                                    return <MenuItem key={index} value = {data} >{data}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        </>)

            default:
                return(<>{placeholder}</>)
        }
    
};

export const CellComponent = (data) => {
    const {content, componentKey, contentFilter, searchParams} = data;
    const contentTypeOf = typeof(content);

    return(
        <>
            <TableCell>
                {contentTypeOf === "string" ?  content : <FilterComponent contentFilter = {contentFilter} componentKey = {componentKey} content={content} searchParams = {searchParams} /> }
            </TableCell>
        </>
    )
}

export const RowComponent = (data) => {
    const {content, header, contentFilter, pathname, idValue, searchParams} = data;
    const keys = Object.keys(content);
    const id = content[idValue];
    const link = `${pathname}/${id}`;

    return(
            <TableRow>
                    {keys.map((data, index) => {return <CellComponent searchParams={searchParams} contentFilter={contentFilter} key={index} componentKey = {data} content = {content[data]} />})}
                    {!header ? <TableCell><Link to={link}>More information</Link></TableCell> : null}
            </TableRow>  
    )
}

export const TableHeaderComponent = (data) =>{
    const {table, contentFilter, searchParams} = data;
    return(
        <>
            <TableHead>
                {table.map((data, index) => { return <RowComponent searchParams = {searchParams} header={true} contentFilter={contentFilter} key={index} content = {data} />})}
            </TableHead>
        </>)
};