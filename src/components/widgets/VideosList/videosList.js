import React, { Component } from 'react';
import './videosList.css';
// import axios from 'axios';
// import {URL} from '../../helpers';
import {firebaseTeams, firebaseVideos , firebaseFormater } from '../../../firebase';
import Button from '../Buttons/buttons';
import VideosTemplate from './videosTemplates';

class VideosList extends Component {

    state={
        teams:[],
        videos:[],
        start: this.props.start,
        end: this.props.start + this.props.end,
        amount: this.props.end
    }

    componentDidMount(){
        this.request(this.state.start , this.state.end)
    }

    // request=(start , end)=>{
    //     if(this.state.teams.length <1){
    //         axios.get(`${URL}/teams`)
    //         .then(response=>{
    //             this.setState({
    //                 teams:response.data
    //             })
    //         })
    //     }

    //     axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
    //     .then(response=>{
    //         this.setState({
    //             videos:[...this.state.videos,...response.data],
    //             start,
    //             end
    //         })
    //     })
    // }

    request=(start,end)=>{
        if(this.state.teams<1){
            firebaseTeams.once('value')
                .then((snapshot)=>{
                    const teams = firebaseFormater(snapshot);
                    this.setState({
                        teams
                    })
                })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot)=>{
                const videos = firebaseFormater(snapshot);
                this.setState({
                    videos: [...this.state.videos, ...videos],
                    start,
                    end
                })
            }).catch((e)=>{
                console.log(e)
            })
    }

    renderVideos=()=>{
        let template =null;

        switch(this.props.type){
            case('card'):
                template = <VideosTemplate data={this.state.videos} teams={this.state.teams}/>
            break;
            default:
                template=null
        }
        return template
    }

    loadMore=()=>{
        let end = this.state.end + this.state.amount;
        this.request(this.state.end +1 , end)
    }

    renderButton=()=>{
        return this.props.loadMore ? 
        <Button type='loadmore' cta='Load More Videos' loadMore={()=>this.loadMore()}/>
        :
        <Button type='linkTo' cta='More Videos' linkTo='/videos'/>
    }

    renderTitle=()=>{
        return this.props.title ? 
        <h3><strong>NBA</strong>Videos</h3>
        :null
    }

    render() {
        return (
            <div className='videos-list-wrapper'>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList
