import React from 'react';
import { Link } from 'react-router-dom'

export default class Organization extends React.Component {
    constructor(props) {
        super(props);
      }

    render(){
        return (
            <div className="fill">
                <button >a.example.com</button>
                <button>example.com</button>
            </div>
        );
    }
    
}