import React, { Component } from 'react';
// import axios from 'axios';
// import{URL} from '../../../helpers';
import {firebaseDB , firebaseTeams , firebaseFormater ,firebaseVideos} from '../../../../firebase';

import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated'

import '../../articles.css'

 class VideoArticle extends Component {

    state={
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    // componentDidMount(){
    //     axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
    //     .then(response=>{
    //         let article=response.data[0];

    //         axios.get(`${URL}/teams?id${article.team}`)
    //         .then(response=>{
    //             this.setState({
    //                 article,
    //             team:response.data
    //             });
    //             this.getRelated();
    //         })
    //     })
    // }

    componentDidMount(){
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseFormater(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getRelated();
            })
        })
    }

    // getRelated=()=>{
    //     axios.get(`${URL}/teams`)
    //     .then( response=>{
    //         let teams = response.data;

    //         axios.get(`${URL}/videos`)
    //         .then( response=>{
    //             this.setState({
    //                 teams,
    //                 related:response.data
    //             })
    //         })
    //     })
    // }

    getRelated=()=>{
        firebaseTeams.once('value').then((snapshot)=>{
            let teams = firebaseFormater(snapshot);

            firebaseVideos.orderByChild('team').equalTo(this.state.article.team)
            .limitToFirst(3).once('value').then((snapshot)=>{
                const related = firebaseFormater(snapshot);

                this.setState({
                    teams,
                    related
                })
            })
        })
    }

    render() {

        const article=this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header teamData={team[0]}/>
                <div className={'video-wrapper'}>
        <h1>{article.title}</h1>
        <iframe 
        title="video"
        width="100%"
        height="300px"
        src={`https://youtube.com/embed/${article.url}`}>

        </iframe>
                </div>
                <VideosRelated
                data={this.state.related}
                teams={this.state.teams}
                />
            </div>
        )
    }
}

export default VideoArticle;
