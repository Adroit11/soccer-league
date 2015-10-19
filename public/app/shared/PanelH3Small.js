/* PanelH3Small.js
 * Displays a small <h3> header in panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelH3Small react component
var PanelH3Small = class extends React.Component {
    render () {
        return (
            <h3 className="center-block text-center"><small>{this.props.heading}</small></h3>
        );
    }
};
//define prop types
PanelH3Small.propTypes = {
    heading: React.PropTypes.node
};
//export component
export { PanelH3Small };
