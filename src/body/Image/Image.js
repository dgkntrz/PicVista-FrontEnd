import './Image.css';

export default function Image(props){
    const {title, description, author, uploadDate, image} = props;


    return (
        <div className='imageText'>
            <div>
                Title: {title}
            </div>
            <div>
                Author: {author}
            </div>
            <div>
                <img src={'data:image/jpeg;base64,' + image} style={{width: 200, height: 200}}></img>
            </div>
            <div>
                {uploadDate}
            </div>
            <div>
                {description}
            </div>    
        </div>
    )

}