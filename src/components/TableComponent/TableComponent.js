import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Table, TableBody} from '@mui/material';
import {TableHeaderComponent, RowComponent, PaginationComponent} from './TableUIComponents';

const TableComponent = (data) => {

        const {content, searchParams, onClickIDValue, savedContent} = data;
        const {location: {pathname}} = useHistory();

        const __staticContent = content["Content"];
        
        const tableContent = savedContent["filteredContent"] ? savedContent["filteredContent"] : __staticContent;
        const tableHeader = content["Header"];

        const [pageState, setPage] = useState(1);
        const [tableContentState, setTableContentState] = useState(tableContent)
        const [filteredTableContentState, setFilteredTableContentState] = useState(null);
        const [pageCountState, setPageCount] = useState(tableContent.length);
        const [searchParamsState, setSearchParamsState] = useState(null);

        const prevPage = () =>{
            setPage(pageState => pageState - 1);
        }
        
        const nextPage = () =>{
            setPage(pageState => pageState + 1);
        }

        const slicePage = (data) => {
            const {content, page} = data;
            const newArr = content.slice((page - 1) * 10, (page * 10));
            return newArr;
        }

        const contentFilter = (e) => {
            const {target: {value, name}} = e;
            searchParams[name] = value;
            setSearchParamsState(state => {return {...state, ...searchParams}});
        }

        useEffect(() => {
            if (searchParamsState){
                const keysObj = Object.keys(searchParamsState);

                const filteredContent = ((searchParam, keys, content) => content.filter((data, index) => {
                        return((data, keys, searchParam, contentIndex) => {
                            return keys.filter((key) => { 
                                return data[key].toLowerCase().indexOf(searchParam[key].toLowerCase()) >= 0 ? contentIndex + 1 : 0;
                            });
                        })(data, keys, searchParam, index).length === keys.length
                }))(searchParamsState, keysObj, __staticContent);

                savedContent["filteredContent"] = filteredContent;
                const filteredContentLength = filteredContent.length;
                setPageCount(filteredContentLength);    
                setTableContentState(filteredContent);
            }
            

        }, [searchParamsState]);

        useEffect(() => {
            const tableContentCount = tableContent.length;
            const tableContentStateCount = tableContentState.length;

            const slicePageContent =  slicePage({content: tableContentCount === tableContentStateCount ? tableContent : tableContentState, page: pageState});
            setFilteredTableContentState(slicePageContent);
        }, [pageState, pageCountState]);

        return(<>
            <Table stickyHeader>
                <TableHeaderComponent table = {tableHeader} contentFilter = {contentFilter} searchParams={searchParams} />  
                <TableBody>
                    {filteredTableContentState ? 
                        filteredTableContentState.map((data, index) => 
                        {
                            return <RowComponent idValue = {onClickIDValue} key={index} content = {data} pathname = {pathname} />
                        }) 
                        : null}
                </TableBody>
            </Table>
            <PaginationComponent pageCount={pageCountState} currPage = {pageState} nextPage = {nextPage} prevPage = {prevPage}/>
        </>);
}

export default TableComponent;