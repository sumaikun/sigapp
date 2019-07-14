import React, { Component } from 'react';

//sources
import logo from '../img/logo.svg';
import '../css/App.css';
import '../css/login.css';

//onsen ui
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import {  Page,  Button,  Input,  ToolbarButton,  Toolbar,  Icon, ProgressBar} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';

//Components
import Main from "./Main";

import Register from "./Register";

//flux
import { fetchLogin } from '../actions';

//helpers
import { formValidation } from '../helpers/formValidation';

class Login extends Component {

  constructor(props)
  {
    super(props);
    this.makeLogin = this.makeLogin.bind(this);
    this.testRoute = this.testRoute.bind(this);
    this.state = {
      test:true,
    }
    if(this.props.login.user.usu_email)
    {
       this.props.navigator.pushPage({component: Main , key: "MAIN_PAGE" });
    }
  }

  componentDidMount() {
    console.log(this.props);
    const backgContainer = document.getElementById('backgContainer');
    console.log(backgContainer.clientHeight);
    this.setState({ backgHeight:backgContainer.clientHeight });
  }

  makeLogin(){

    let validation = formValidation([
      {
        ref:this.userMail,
        name:"Correo"
      },
      {
        ref:this.userPassword,
        name:"Contraseña"
      }
    ]);

    let successCallBack = () => {
        this.props.navigator.pushPage({component: Main , key: "MAIN_PAGE" });
    };

    validation ? this.props.fetchLogin({
      email: this.userMail.value.toLowerCase(),
      password: this.userPassword.value
    },successCallBack) : false;

  }

  testRoute(){
    let successCallBack = () => {
      //this.props.navigator.pushPage({component: Main , key: "MAIN_PAGE" });
    };
  }

  onResize = (width,height) => {
    const backgContainer = document.getElementById('backgContainer');


    if(height < this.state.backgHeight)
    {
      //console.log("prevent that resize");
      backgContainer.style.height = this.state.backgHeight+"px";
    }

  }

  render() {

     let toolbarButton;

    /*
    if (!Ons.platform.isAndroid()) {
       toolbarButton = <ToolbarButton >
         <Icon icon={{default: 'ion-log-in'}} />
       </ToolbarButton>;
    }
    else{
      toolbarButton = "Boton en android";
    }*/

    const { isFetching } = this.props.appState;

    return (
      <Page id="login"
         renderToolbar={() =>
           <Toolbar>
             <div className="center">Login</div>
             <div className="right">
             <ToolbarButton onClick={this.state.test ?   this.makeLogin : this.testRoute  }>
               <Icon  icon={{default: 'ion-log-in'}} />
             </ToolbarButton>
             </div>
           </Toolbar>
           }>

           { isFetching ? <ProgressBar indeterminate  /> : null }




           <div className="login-wrap" id="backgContainer">
            <div className="login-html">

            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />

             <div className="App">
              <br/>
              <img id='logo' className="App-logo" src={logo} />
                <div id='logoTitle'>
                   <strong>Bienvenido</strong>
                </div>
                <br/>
              </div>
              <div className="login-form">
                <div className="group">
                  <input  className="input" placeholder="Email" type="text" ref={(input) => this.userMail = input}  />
                </div>
                <div className="group">
                  <input  className="input" placeholder="Password" type="password" ref={(input) => this.userPassword = input}  />
                </div>
                <div className="group">
                  <Button id='signIn' onClick={this.makeLogin}  modifier="large">Ingresar</Button>
                </div>
              </div>
            </div>
          </div>
        </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    appState: state.appState,
  };
}

export default  connect(mapStateToProps, { fetchLogin })(Login);
