import React, { Component } from 'react';
import './InputBar.css';
import { create, all } from 'mathjs';

const config = { }
const math = create(all, config)

export default class InputBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            textInput:'',
            operators: [],
            numbers:[],
            errorMessage:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({textInput: event.target.value});
      }

    calculate = () => {
        // step 0: set error message back to ''
        this.setState({errorMessage: ""});
        try {
            let current_result = math.evaluate(this.state.textInput);
            let result_string = this.state.textInput.concat("= " + current_result);
            this.setState({textInput:result_string});
            this.props.socket.emit('newCalculation', result_string);
        }
        catch (err) {
            this.setState({errorMessage: "ERROR: "+ err});
        }
    }

    render() {
        return(
            <div id="inputBar">
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="calculationInput" value={this.state.textInput} onChange={this.handleChange} placeholder="1 + 1"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" onClick={() => this.calculate()}>Calculate</button>
                </div>
            </div>
            <p className="text-danger">{this.state.errorMessage}</p>
            </div>
        )
    }
}
