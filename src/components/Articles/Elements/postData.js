import React from 'react';
import moment from 'moment';
import '../articles.css';


const PostData = (props)=>{
    const formatDate=(date)=>{
        return moment(date).format(' DD-MM-YYYY')
    }
    return(
        <div className='article-post-data'>
            <div>
                Date:
    <span>{formatDate(props.data.date)}</span>
            </div>
            <div>
                Author:
    <span>{props.data.author}</span>
            </div>
        </div>
    )
}


export default PostData;