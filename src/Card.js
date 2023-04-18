import React from "react";
import RollingNumber from "./RollingNumber";

import "./Card.scss";

class Card extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <a className="card" href={`https://www.roblox.com/games/${this.props.info.gameId}`}>
                <div className="container">
                    <img className="thumbnail" src={this.props.info.thumbnail} alt="Game Thumbnail"></img>
                    <b className="name info">{this.props.info.name}</b>
                    <p className="playing info"><i className="fa fa-user"/> <b>{<RollingNumber goal={this.props.info.playing}/>}</b> Playing</p>
                    <p className="visits info"><i className="fa fa-eye"/> <b>{<RollingNumber goal={this.props.info.visits}/>}</b> Visits</p>
                    <p className="favorites info"><i className="fa fa-star"/> <b>{<RollingNumber goal={this.props.info.favorites}/>}</b> Favorites</p>
                </div>
            </a>
        )
    }
}

export default Card;