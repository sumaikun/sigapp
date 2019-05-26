import React, { Component } from 'react';

import {
  Toolbar,  BackButton,  Icon,  ToolbarButton } from 'react-onsenui';


let styles = {};

class NavBar extends Component {

  constructor(props) {
    super(props);
    //console.log(props);
  }

  render() {
    if(this.props.styles == "blue")
    {
      styles = {
         customToolBar:{
           backgroundColor: 'rgba(40,57,101,.9)'
         },
         customToolBarIcon:{
           color: 'black',
         },
         toolBarTitle:{
           color:"white",
           fontWeight: 'bold'
         }
       }
    }
    else{
      styles = {
         customToolBar:{
           backgroundColor: 'white'
         },
         customToolBarIcon:{

         },
         toolBarTitle:{
           color:"black",
           fontWeight: 'bold'
         }
       }
    }


    //console.log(this.props.styles);

    return (
      <Toolbar style={styles.customToolBar}>
        <div className='left' >
          {this.props.backButton ? <BackButton onClick={() => {
            this.props.backButtonAction ? this.props.backButtonAction() : false; 
            this.props.navigator.popPage();
          }} style={styles.customToolBarIcon}><Icon rotate={180}  icon={{default: 'ion-log-in'}} /></BackButton> : null}
        </div>
        <div className='center' style={styles.toolBarTitle}>{this.props.title}</div>
        <div className='right'>
          <ToolbarButton  onClick={this.props.showMenu}>
            <Icon style={styles.customToolBarIcon} icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }
}


export default NavBar;
