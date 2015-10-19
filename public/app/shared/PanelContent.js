/* PanelContent.js
 * Displays the content section of panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelContent react component
var PanelContent = class extends React.Component {
    render () {
        return (
            <div id={this.props.id} className="content row container-fluid">
                {this.props.children}
            </div>
        );
    }
};
//define prop types
PanelContent.propTypes = {
    id: React.PropTypes.string
};
//export component
export { PanelContent };
