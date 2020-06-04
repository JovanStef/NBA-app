import React , {Component} from 'react';
import { firebaseArticles , firebaseFormater} from '../../../firebase';

// import axios from 'axios';
// import {URL} from '../../helpers';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state={
        news:[]
    }

    componentDidMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaseFormater(snapshot);

            this.setState({
                news
            })
        })
    }

    // componentDidMount(){
    //     axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`).then(
    //         response=>{
    //                 this.setState({
    //                     news:response.data
    //                 })
    //         }
    //     )
    // }

    render(){
        return(
           <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        )
    }
}

export default NewsSlider;