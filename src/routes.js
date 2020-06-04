import React , {Component} from 'react';
import {Route , Switch} from 'react-router-dom';

//COMPONENTS
import Home from './components/home/home';
import Layout from './hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideosArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main/Index';
import SignIn from './components/SignIn/signIn';

const Routes =(props)=> {
        return(
            <Layout user={props.user}>

            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/news" exact component ={NewsMain}/>
                <Route path="/articles/:id" exact component={NewsArticle}/>
                <Route path="/videos/:id" exact component={VideosArticle}/>
                <Route path="/videos" exact component={VideosMain}/>
                <Route path="/sign-in" exact component={SignIn}/>

            </Switch>
            </Layout>
        )
}

export default Routes;