import React, { Component } from 'react';
import {firebaseDB , firebaseTeams , firebaseFormater} from '../../../../firebase';
// import axios from 'axios';
// import {URL} from '../../../helpers';

import '../../articles.css';

import Header from './header';


class NewsArticles extends Component {


    state={
        article:[],
        team:[]
    }

    // componentDidMount(){
    //     axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
    //     .then(response=>{
    //         let article=response.data[0];

    //         axios.get(`${URL}/teams?id${article.team}`)
    //         .then(responce=>{
    //             this.setState({
    //                 article,
    //             team:responce.data
    //             })
    //         })
    //     })
    // }

    componentDidMount(){
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseFormater(snapshot);
                this.setState({
                    article,
                    team
                })
            })
        })
    }

    render() {
        const article = this.state.article;
        const team= this.state.team
        return (
            <div className='article-wrapper'>
            <Header
                teamData={team[0]}
                date={article.date}
                author={article.author}
            />
            <div className='article-body'>
        <h1>{article.title}</h1>
                <div className='article-image' style={{background:`url("/images/articles/${article.image}")`}}>
                </div>
                <div className="article-text">
                    {article.body}
                </div>
            </div>
            </div>
        )
    }
}

export default NewsArticles
