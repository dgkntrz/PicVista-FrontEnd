import { Button } from '@mui/material';
import './Image.css';
import * as React from 'react';
import ImagePreview from './ImagePreview';

export default function Image(props){
    const {title, description, author, uploadDate, id, image, deleteAble, deleteImage} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <div className='imageText'>
            <div>
                Title: {title}
            </div>
            <div>
                Author: {author}
            </div>
            <div>
                <img className='hover' onClick={() => {
                    setOpen(true);
                }} src={'data:image/jpeg;base64,' + image} style={{width: 200, height: 200}}></img>
            </div>
            <div>
                {uploadDate}
            </div>
            <div>
                {description}
            </div>    
            {deleteAble ? <div style={{paddingTop: "1em"}}>
                <Button variant='contained' onClick={() => {
                    deleteImage(id);
                }}>Delete</Button>
                </div> : <></>}
            <ImagePreview setOpen={setOpen} open={open} image={image} title={title}/>
        </div>
    )

}