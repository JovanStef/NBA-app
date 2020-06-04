import React from'react';

import NewsSlider from '../../../widgets/newsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';
const NewsMain =(props)=>{
    return(
        <div>
            <NewsSlider
            type="featured"
            settings={{dots:false}}
            start={0}
            end={3}
            />

            <NewsList
            type="cardMain"
            loadMore={true}
            start={3}
            end={10}
            />

            
        </div>
    )
}

export default NewsMain;