/* PanelH5.js
 * Displays an <h5> header in panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelH5 react component
var PanelH5 = class extends React.Component {
    render () {
        return (
            <h5><strong>{this.props.heading}</strong></h5>
        );
    }
};
//define prop types
PanelH5.propTypes = {
    heading: React.PropTypes.node
};
//export component
export { PanelH5 };
