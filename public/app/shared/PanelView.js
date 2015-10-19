/* PanelView.js
 * Displays the panel container
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { PanelH3 } from './PanelH3.js';
import { PanelH3Small } from './PanelH3Small.js';
import { PanelContent } from './PanelContent.js';
//create PanelView react component
var PanelView = class extends React.Component {
    render () {
        return (
            <div id={this.props.id} className="team-player-view container-fluid panel center-block">
                <div className="top">
                    <div className="img">
                        {this.props.top.img}
                    </div>
                    
                    <h2 className="center-block text-center">{this.props.top.headings[0]}</h2>
                    <PanelH3Small heading={this.props.top.headings[1]} />
                    <PanelH3 heading={this.props.top.headings[2]} />
                </div>
                
                <PanelContent id={this.props.contentId}>
                    {this.props.children}
                </PanelContent>
            </div>
        );
    }
};
//define prop types
PanelView.propTypes = {
    id:         React.PropTypes.string,
    top:        React.PropTypes.object,
    contentId:  React.PropTypes.string
};
//export component
export { PanelView };
