import React from 'react';

import VideosTemplates from '../videosTemplates'

import '../videosList.css';

const VideosRelated= (props)=>{
    return(
<div className='related-wrapper'>
    <VideosTemplates
    data={props.data}
    teams={props.teams}
    />
</div>
    )
}

export default VideosRelated;