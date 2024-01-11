import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import FileUploadComponent from '../fileupload/FileUpload';
import { deleteRequest, getRequestWithConfig } from '../utils/RequestBuilder';
import * as Urls from '../utils/Urls';
import Image from './Image/Image';
import './ImageScreen.css';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ImageScreen(props) {
    const { toastSuccess, toastError, userName, singleRequest } = props;

    const [fileUploadVisible, setFileUploadVisible] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalImages, setTotalImages] = React.useState(0);
    const [sizePerPage, setSizeByPage] = React.useState(3);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        async function getImages() {
            let url;
            if (singleRequest) {
                url = Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImagesByAuthor + '/' + userName;
            }
            else {
                url = Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImages;
            }
            const response = await getRequestWithConfig(url,
                { "page": page, "sizePerPage": sizePerPage });

            setImages(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalImages(response.data.totalElements);
        }
        getImages();

    }, [page])

    React.useEffect(() => {
        async function getImages() {
            let url;
            if (singleRequest) {
                url = Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImagesByAuthor + '/' + userName;
            }
            else {
                url = Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImages;
            }
            const response = await getRequestWithConfig(url,
                { "page": page, "sizePerPage": sizePerPage });

            setImages(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalImages(response.data.totalElements);
        }
        getImages();

    }, [sizePerPage])

    async function updateImages() {
        const response = await getRequestWithConfig(Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImages,
            { "page": page, "sizePerPage": sizePerPage });

        setImages(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalImages(response.data.totalElements);
    }

    async function deleteImages(id) {
        await deleteRequest(Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.deleteImages + '/' + id);
        const response = await getRequestWithConfig(Urls.imageServiceBaseUrl + Urls.imageBasePath + Urls.getImagesByAuthor + '/' + userName,
            { "page": page, "sizePerPage": sizePerPage });

        toastSuccess("Image deleted.")

        setImages(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalImages(response.data.totalElements);
    }

    function fileUploadToggle() {
        setFileUploadVisible(!fileUploadVisible);
    }

    function onNextPage() {
        setPage(page + 1);
    }

    function onPreviousPage() {
        setPage(page - 1);
    }

    function getBottomPageNumbers() {
        const pageNumbers = [];
        if (totalPages < 5) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(
                    <Button size='medium' variant={page === i ? 'contained' : 'outlined'} onClick={() => {
                        setPage(i);
                    }}>{i + 1}</Button>
                )
            }
        }
        else {
            pageNumbers.push(
                <Button size='medium' variant={page === 0 ? 'contained' : 'outlined'} onClick={() => {
                    setPage(0);
                }}>1</Button>
            )

            if (page < 2) {
                pageNumbers.push(
                    <Button size='medium' variant={page === 1 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(1);
                    }}>2</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={page === 2 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(2);
                    }}>3</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={page === 3 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(3);
                    }}>4</Button>
                )
            }
            else if (page > totalPages - 3) {
                pageNumbers.push(
                    <Button size='medium' variant={page === totalPages - 4 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 4);
                    }}>{totalPages - 3}</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={page === totalPages - 3 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 3);
                    }}>{totalPages - 2}</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={page === totalPages - 2 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(totalPages - 2);
                    }}>{totalPages - 1}</Button>
                )
            }
            else {
                const currentPage = page;
                pageNumbers.push(
                    <Button size='medium' variant={currentPage === page - 1 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page - 1);
                    }}>{page}</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={currentPage === page ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page);
                    }}>{page + 1}</Button>
                )
                pageNumbers.push(
                    <Button size='medium' variant={currentPage === page + 1 ? 'contained' : 'outlined'} onClick={() => {
                        setPage(page + 1);
                    }}>{page + 2}</Button>
                )
            }





            pageNumbers.push(
                <Button size='medium' variant={page === totalPages - 1 ? 'contained' : 'outlined'} onClick={() => {
                    setPage(totalPages - 1);
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
                <Grid item xs={1} style={singleRequest ? { visibility: "hidden" } : {}}>
                    <Tooltip title="Upload Pictures">
                        <IconButton disabled={userName === ""} onClick={fileUploadToggle} style={{ backgroundColor: "#1976d2" }} size='large'><Add fontSize='large' /></IconButton>

                    </Tooltip>
                </Grid>

                <Grid item xs={15} className='imageMainHeader'>
                    {singleRequest ? "Your Images" : "Image Repository"}

                </Grid>

                {images.map((item) => {
                    return (
                        <Grid item xs={15 / sizePerPage}>
                            <Image title={item.title} description={item.description} author={item.author}
                                uploadDate={item.uploadDate} id={item.imageId} image={item.image.data} deleteAble={singleRequest ? true : undefined} deleteImage={deleteImages} />
                        </Grid>
                    )


                })}

                <Grid item xs={15} style={{ paddingTop: "3em" }}>


                    <Grid container spacing={2} columns={4}>
                        <Grid item xs={1.17}>

                        </Grid>
                        <Grid item xs={0.5}>

                            <Button size='medium' onClick={onPreviousPage} disabled={page === 0} variant='contained'>{"<"}</Button>

                        </Grid>

                        <Grid item xs={0.5} style={singleRequest ? {visibility: "hidden"} : {}}>

                            {getBottomPageNumbers()}

                        </Grid>



                        <Grid item xs={0.5}>

                            <Button size='medium' onClick={onNextPage} disabled={page >= totalPages - 1} variant='contained'>{">"}</Button>

                        </Grid>

                        <Grid item xs={0.16} style={singleRequest ? {textAlign: "center", visibility: "hidden"} : {textAlign: "center"}}>

                            <FormControl size="small">
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sizePerPage}
                                    onChange={(event) => {
                                        setSizeByPage(event.target.value);
                                    }}
                                >
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={1.17}>

                        </Grid>

                    </Grid>

                </Grid>




                <FileUploadComponent open={fileUploadVisible} fileUploadState={setFileUploadVisible}
                    toastSuccess={toastSuccess}
                    toastError={toastError}
                    userName={userName}
                    imagesUpdated={updateImages} />
            </Grid>
        </Box>
    );
}