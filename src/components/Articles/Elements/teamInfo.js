import React from 'react';
import '../articles.css';

const TeamInfo = (props)=>{
    return(
        <div className='article-team-header'>
            <div className='article-left' style={{ background:`url('/images/teams/${props.team.logo}')`}}></div>
            <div className='article-right'>
    <div><span>{props.team.city} {props.team.name}</span></div>
    <div>
        <strong>
            W{props.team.stats[0].wins} - L{props.team.stats[0].defeats}
        </strong>
    </div>
            </div>
        </div>
    )
}


export default TeamInfo;