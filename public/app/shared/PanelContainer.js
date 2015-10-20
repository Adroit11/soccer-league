/* PanelContainer.js
 * Displays panel container
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 20, 2015
 */
"use strict";
//include modules
import React from 'react';
//create PanelContainer react component
var PanelContainer = class extends React.Component {
    render () {
        return (
            <div id={this.props.id} className="team-player-view container-fluid panel center-block">
                {this.props.children}
            </div>
        );
    }
};
//define prop types
PanelContainer.propTypes = {
    id: React.PropTypes.string
};
//export component
export { PanelContainer };
