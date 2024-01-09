import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import FileUploadComponent from '../fileupload/FileUpload';
import { getRequest, getRequestWithConfig } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';
import Image from './Image/Image';
import './ImageScreen.css';


export default function ImageScreen(props) {
    const { toastSuccess, toastError, userName } = props;

    const [fileUploadVisible, setFileUploadVisible] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalImages, setTotalImages] = React.useState(0);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        async function getImages() {
            const response = await getRequestWithConfig(Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImages,
                { "page": page });

            setImages(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalImages(response.data.totalElements);
        }
        getImages();

    }, [page])

    function fileUploadToggle() {
        setFileUploadVisible(!fileUploadVisible);
    }

    function onNextPage(){
        setPage(page+1);
    }

    function onPreviousPage(){
        setPage(page-1);
    }

    function getBottomPageNumbers(){
        const pageNumbers = [];
        if (totalPages < 5){
            for (let i = 0; i < totalPages; i++){
                pageNumbers.push(
                    <Button variant={page === i ? 'contained' : 'outlined'} onClick={() => {
                        setPage(i);
                    }}>{i+1}</Button>
                )
            }
        }
        else {
            pageNumbers.push(
                <Button variant={page === 0 ? 'contained' : 'outlined'} onClick={() => {
                    setPage(0);
                }}>1</Button>
            )

            if (page < 2) {
                pageNumbers.push(
                    <Button variant={page === 1 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(1);
                    }}>2</Button>
                )
                pageNumbers.push(
                    <Button variant={page === 2 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(2);
                    }}>3</Button>
                )
                pageNumbers.push(
                    <Button variant={page === 3 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(3);
                    }}>4</Button>
                )
            }
            else if (page > totalPages - 3) {
                pageNumbers.push(
                    <Button variant={page === totalPages - 4  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 4);
                    }}>{totalPages - 3}</Button>
                )
                pageNumbers.push(
                    <Button variant={page === totalPages - 3  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 3);
                    }}>{totalPages - 2}</Button>
                )
                pageNumbers.push(
                    <Button variant={page === totalPages - 2  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 2);
                    }}>{totalPages - 1}</Button>
                )
            }
            else {
                const currentPage = page;
                pageNumbers.push(
                    <Button variant={currentPage === page - 1  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page - 1);
                    }}>{page}</Button>
                )
                pageNumbers.push(
                    <Button variant={currentPage === page  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page);
                    }}>{page + 1}</Button>
                )
                pageNumbers.push(
                    <Button variant={currentPage === page + 1  ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page + 1);
                    }}>{page + 2}</Button>
                )
            }

           

           

            pageNumbers.push(
                <Button variant={page === totalPages - 1  ? 'contained' : 'outlined'} onClick={() => {
                    setPage(totalPages-1);
                }}>{totalPages}</Button>
            )
        }
        return (<div>{pageNumbers}</div>);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={15}>
                <Grid item xs={32}>

                </Grid>
                {userName === "" ? <></> : <Grid item xs={1}>
                    <IconButton onClick={fileUploadToggle} style={{ backgroundColor: "#1976d2" }} size='large'><Add fontSize='large' /></IconButton>
                </Grid>}

                <Grid item xs={15} className='imageMainHeader'>

                    Latest Images

                </Grid>

                {images.map((item) => {
                    return (
                        <Grid item xs={page === totalPages-1? 15 / (totalImages % 3) : 5}>
                            <Image title={item.title} description={item.description} author={item.author} uploadDate={item.uploadDate} image={item.image.data} />
                        </Grid>
                    )


                })}

                <Grid item xs={5} style={{paddingTop: "3em"}}>

                    <Button onClick={onPreviousPage} disabled={page === 0} variant='contained'>Previous Page</Button>

                </Grid>

                <Grid item xs={5} style={{paddingTop: "3em"}}>
                
                    {getBottomPageNumbers()}

                </Grid>

                <Grid item xs={5} style={{paddingTop: "3em"}}>

                    <Button onClick={onNextPage} disabled={page === totalPages -1} variant='contained'>Next Page</Button>

                </Grid>


                <FileUploadComponent open={fileUploadVisible} fileUploadState={setFileUploadVisible}
                    toastSuccess={toastSuccess}
                    toastError={toastError}
                    userName={userName} />
            </Grid>
        </Box>
    );
}