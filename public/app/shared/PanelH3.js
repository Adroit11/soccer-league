/* PanelH3.js
 * Displays an <h3> header in panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelH3 react component
var PanelH3 = class extends React.Component {
    render () {
        return (
            <h3 className="center-block text-center">{this.props.heading}</h3>
        );
    }
};
//define prop types
PanelH3.propTypes = {
    heading: React.PropTypes.node
};
//export component
export { PanelH3 };
