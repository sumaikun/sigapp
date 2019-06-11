import React, { Component } from 'react';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import {  Navigator,
Splitter,
SplitterSide,
SplitterContent,
List,
ListItem,
Page,
Icon,
BottomToolbar } from 'react-onsenui';

import Ons from 'onsenui';

import Login from './pages/Login.js';

import Register from './pages/Register';

import Main from './pages/Main';

import ActivitiesList from './pages/ActivitiesList';

import '../src/css/navigationMenu.css';

import { connect } from 'react-redux';

import { activityCreated } from './actions';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.loadPage = this.loadPage.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.closeSession = this.closeSession.bind(this);
    /*const renderPage = (route, navigator) => (
      <route.component key={route.key} navigator={navigator} showMenu = {this.show} />
    );*/
  }

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.showMenu = this.show.bind(this);
    route.props.key = route.key;

    //console.log(React.createElement(route.component, route.props));

    return React.createElement(route.component, route.props);
  }

  hide() {
    //console.log("the menu is not shown");
    this.setState({ isOpen: false });
  }

  show() {
    //console.log("the menu is beign show");
    this.setState({ isOpen: true });
  }

  loadPage(page,pageKey) {
    this.hide();

    let forceReset = false;

    //console.log(this.navigator.pages);
    const currentPage = this.navigator.pages.slice(-1)[0] // --- or [this.navigator.pages.length - 1]
    //console.log(currentPage.key);
    //console.log(pageKey);

    this.navigator.pages.forEach( page => {
      console.log(page);

      if(page.key == pageKey && currentPage.key != page.key)
      {
        forceReset = true;
      }
    });

    if(currentPage.key != pageKey && forceReset == false ){
      this.navigator.resetPage({ component: page, key: pageKey  }, { animation: 'fade' });
    }
    else{
      if(forceReset)
      {
        this.navigator.pushPage({ component: page, key: pageKey  }, { animation: 'fade' });
      }
    }
  }

 //, props: { key: page.name }

  closeSession(){
    let self = this;
    Ons.notification.confirm('!Estas seguro!').then(function(res) {
      res ? (()=>{
        self.hide();
        self.navigator.pushPage({component: Login });
      })() : false;
      //ons.notification.alert('Hello ' + name);
    });

  }

  render() {



    return (
      <Splitter>
        <SplitterSide side='left' width={220} collapse={true} swipeable={true} isOpen={this.state.isOpen} onClose={this.hide} onOpen={this.show}>
          <Page>
            <div style = {{ backgroundColor:" white", height: '100%' }}>
              <List>
                <ListItem  onClick={()=>{this.loadPage(Main,"MAIN_PAGE")}} tappable>
                  <Icon icon="fa-user" size={12} style={{color:"#193146"}}></Icon>  <span style={{marginLeft:"15px"}}> Perfil</span>
                </ListItem>
                <ListItem  onClick={()=>{ this.props.activityCreated();  this.loadPage(Register,"REGISTER_PAGE")}} tappable>
                  <Icon icon="fa-file" size={12} style={{color:"#193146"}}></Icon>  <span style={{marginLeft:"15px"}}> Registrar Actividad</span>
                </ListItem>
                <ListItem onClick={()=>{this.loadPage(ActivitiesList,"LIST_PAGE")}} tappable>
                  <Icon icon="ion-compass" style={{color:"#193146"}}></Icon> <span style={{marginLeft:"15px"}}> Ver actividades </span>
                </ListItem>
                <ListItem  onClick = {this.closeSession} tappable>
                  <span style={{marginRight:"15px"}}>Finalizar sesión</span> <Icon icon="fa-key" size={12} style={{color:"#193146"}}></Icon>
                </ListItem>
              </List>
            </div>
            <BottomToolbar modifier="material" style={{backgroundColor:"#193146"}}>
              <br/>
              <span style={{fontWeight:"bold",fontStyle:"italic",marginLeft:"25px"}}>System integral group</span>
            </BottomToolbar>
          </Page>
        </SplitterSide>
        <SplitterContent>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={{ component: Login , key: "LOGIN_PAGE"  }}
              ref={(navigator) => { this.navigator = navigator; }}
            />
        </SplitterContent>
      </Splitter>

    );
  }

}

const mapStateToProps = state => {
  return {
    activity: state.activity,
  };
}

export default  connect(mapStateToProps, { activityCreated })(App);



/*<Ons.Navigator initialRoute={{ component: Home, props: { key: Home.name } }} renderPage={this.renderPage.bind(this)} ref={(navigator) => { this.navigator = navigator; }} />*/
