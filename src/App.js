import React from 'react';

import './App.scss';
import './Wheel.scss';

import Roblox from './API/Roblox';

import Games from "./Games.json";
import Card from './Card';
import RollingNumber from './RollingNumber';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameInfo: {},
            analytics: {
                playing: 0,
                visits: 0
            }
        }
    }

    refresh = () => {
        Roblox.getGameInfo(Games).then((info) => {
            if (info == null || info.mainData == null || info.totalAnalytics == null) {
                return;
            }

            this.setState({
                gameInfo: info.mainData,
                analytics: info.totalAnalytics,
                loaded: true
            })
        });
    }

    componentDidMount() {
        this.refresh();

        this.refreshInterval = setInterval(() => {
            this.refresh();
        }, 15000)
    }

    componentWillUnmount() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    render() {
        return (
            <div className='app'>
                <h3>
                    Jandel's Games
                </h3>
                <p>
                    Look at all those numbers go!
                </p>
                <p>
                    <b>
                        <RollingNumber goal={this.state.analytics.playing}/>
                    </b> Players 
                    | <b><RollingNumber goal={this.state.analytics.visits}/>
                    </b> Total Visits
                </p>

                <div className='spacer'/>

                <div className='game-list'>
                    {
                        this.state.loaded ? null : <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    }
                    {
                        Object.values(this.state.gameInfo).sort((a, b) => b.playing - a.playing).map((info) => {
                            return <Card info={info} key={info.gameId}/>
                        })
                    }
                </div>

                <img src="NZoA_RGB_Game Sector Logo_WhiteText.png" alt="Game Sector Logo" className="game-sector-logo" width="513px" height="438px"/>
            </div>
        )
    }
}

export default App;
