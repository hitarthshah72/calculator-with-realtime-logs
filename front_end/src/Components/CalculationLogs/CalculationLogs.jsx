import React, { Component } from 'react';

export default class CalculationLogs extends Component {
    render() {
        if (this.props.logs.length === 0){
            return (
                <p>No logs as of now. Please make some calculations</p>
            )
        }
        return(
            <ul id="calculationLog" className="list-group">
                {this.props.logs.reverse().map(log =>
                    <li class="list-group-item">{log}</li>
                    )}
            </ul>
        )
    }
}
