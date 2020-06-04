import React from 'react';
import VideosList from '../../../widgets/VideosList/videosList';

const VideosMain =()=>{
    return(
        <VideosList
        type='card'
        title={false}
        loadMore={true}
        start={0}
        end={10}
        />
    )
}

export default VideosMain;
