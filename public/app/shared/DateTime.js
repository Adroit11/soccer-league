/* DateTime.js
 * Displays a timestamp in PST time
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
import moment from 'moment';
//create DateTime react component
var DateTime = class extends React.Component {
    render () {
        //create date
        var date = moment(this.props.timestamp), formats;
        //subtract hours to set PST time
        date.utcOffset(-480);
        //create formats
        formats = {
            match: <span>{date.format("MMM. D, ")}<small>{date.format("HH:mm ")}PST</small></span>,
            single: <span>{date.format("MMM. D, YYYY, HH:mm ")}PST</span>
        };
        
        return (
            <span>{formats[this.props.format] || formats["match"]}</span>
        );
    }
};
//define prop types
DateTime.propTypes = {
    timestamp: React.PropTypes.number
};
//export component
export { DateTime };
