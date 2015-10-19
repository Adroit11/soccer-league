/* PanelH4.js
 * Displays an <h4> header in panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelH4 react component
var PanelH4 = class extends React.Component {
    render () {
        return (
            <h4><strong>{this.props.heading}</strong></h4>
        );
    }
};
//define prop types
PanelH4.propTypes = {
    heading: React.PropTypes.node
};
//export component
export { PanelH4 };
