import React from "react";

class RollingNumber extends React.Component {
    constructor() {
        super();

        this.state = {
            progress: 0,
            lastNumber: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.goal !== this.props.goal) {
            this.setState({
                progress: 0,
                lastNumber: prevProps.goal || 0
            });
        }
    }

    componentDidMount() {
        this.loop = setInterval(() => {
            this.setState({
                progress: Math.min(this.state.progress + 1, 10)
            });
        }, 1);
    }

    componentWillUnmount() {
        if (this.loop) {
            clearInterval(this.loop);
        }
    }

    floorLerp = (a, b, t) => {
        return Math.floor((1-t)*a+t*b);
    }

    render() {
        return (
            <>
                {this.floorLerp(this.state.lastNumber, this.props.goal || 0, this.state.progress / 10).toLocaleString("en-US")}
            </>
        )
    }
}

export default RollingNumber;