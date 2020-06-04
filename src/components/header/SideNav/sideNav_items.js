import React from 'react';
import { Link , withRouter} from 'react-router-dom';
import {firebase} from '../../../firebase';

import FontAwesome from 'react-fontawesome';
import './sideNav.css'

const SideNavItems=(props)=>{
console.log(props)
    const items=[
        {
            style:'option',
            icon:'home',
            link:'/',
            text:'Home',
            login:''
        },
        {
            style:'option',
            icon:'file-text-o',
            link:'/news',
            text:'News',
            login:''
        },
        {
            style:'option',
            icon:'play',
            link:'/videos',
            text:'Videos',
            login:''
        },
        {
            style:'option',
            icon:'sign-in',
            link:'/dashboard',
            text:'Dashboard',
            login:false
        },
        {
            style:'option',
            icon:'sign-in',
            link:'/sign-in',
            text:'Sign-in',
            login:true
        },
        {
            style:'option',
            icon:'sign-out',
            link:'/sign-out',
            text:'Sign-out',
            login:false
        }
    ]


    const element=(item,i)=>(
        <div key={i}className={item.style}>
        <Link to={item.link}>
            <FontAwesome name={item.icon}/>
            {item.text}
        </Link>
    </div>
    )

    const restricted=(item,i)=>{
        let template =null;

        if( props.user === null && item.login){
            template=element(item,i)
        }
        if(props.user !== null && !item.login){
            if(item.link === '/sign-out'){
                template=(
                    <div 
                    key={i}
                    className={item.style}
                    onClick={()=>{
                        console.log('out')
                        firebase.auth().signOut()
                        .then(()=>{
                            props.history.push("/")
                        })
                    }}
                    >
                        <FontAwesome name={item.icon}/>
                        {item.text}
                </div>
                )
            }else{
                console.log('out')

                template = element(item,i)
            }
        }
        return template
    }

    const showItems=()=>{
        return items.map((item,i)=>{
            return item.login === false ?
            restricted(item,i)
            :
            element(item,i)
        })
    }

    return(
        <div>
            {showItems()}
        </div>
    )
}

export default withRouter(SideNavItems);