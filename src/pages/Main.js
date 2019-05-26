import React, { Component } from 'react';

//libraries
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';

//Onsen ui
import {  Page, Icon, Card, Row, List, ListItem, ListHeader, ProgressBar } from 'react-onsenui';
import Ons from 'onsenui';

//Components
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
//sources
import '../css/App.css';

//pages

import Register from "./Register";

//flux
import { getListActivitiesParameter , getCustomersParameter , getCompaniesParameter, dashBoardUserData, replicateOnlyCustomer } from '../actions';

const styles = {
  totalHours:{ fontSize: "60px", color: "rgb(74, 74, 74)"},
  buttons: {
    fontSize: '20px',
    color: '#cacaca'
  },
  refreshButton: {
    margin: '0 25px 0 0'
  }
}

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '...' : this;
      };

const colors = ["#FF6384","#36A2EB","#FFCE56","#FFCE56","blue"];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.props.dashBoardUserData(this.props.login.user.usu_id);

  }


  componentDidMount(){
    console.log(this.props.login);
    this.props.getListActivitiesParameter();
    this.props.getCompaniesParameter();
    this.props.getCustomersParameter();
  }

  showMenu() {
    console.log("show menu");
    this.props.showMenu();
  }

  renderSquare(color) {
    return (
      <div style={{width:"10px",height:"10px",background:color, marginRight:"25px"}} ></div>
    );
  }

  renderRow(row,idx){
    return(
      <ListItem  tappable>
        { row.customer.nombre }
          <div className='right' style={styles.buttons}>
            {this.renderSquare(colors[idx])}
            <Icon icon='refresh' className='weather-button' style={styles.refreshButton} className={'spin-animation'} onClick={()=>{
              this.props.replicateOnlyCustomer(row.customer.id);
              this.props.navigator.resetPage({component: Register , key: "REGISTER_CREPLICATE", props: {replicateCustomer:true}  });
              console.log("recreate register");
            }} />
          </div>
      </ListItem>
    );
  }

  contentPage(dashboard){

        console.log("in content page");
        console.log(dashboard);

        const { popularCustomers , total_hours } = dashboard;

        let labels = [];
        let dataset = [];

        popularCustomers.forEach( customer => {
            console.log(customer);
            labels.push(customer.customer.nombre.trunc(22));
            dataset.push(customer.totalTime);
        });

        console.log(labels);
        console.log(dataset);

        const data = {
        	labels: labels,
        	datasets: [{
        		data: dataset,
        		backgroundColor: colors,
        		hoverBackgroundColor: colors
        	}]
        };


        console.log(this.props.activity);



    return(
      <div>
        {/* isFetching ? <ProgressBar indeterminate  /> : null */}

        <Card>

            <div className="App">
                <span style={{color: "rgb(74, 74, 74)"}} >Número de horas reportadas</span>
                <br /><br />
                <span style={styles.totalHours} > {this.props.activity.dashboard ? total_hours : 0}   H</span>
                <br />
                <Icon icon="fa-grip-lines" />
             </div>

        </Card>

        <Card>
          <Pie data={data} options={{ legend: { display: false, }, }} />
        </Card>

        <Card>
          <List
            renderHeader={() =><ListHeader style={{fontSize: 10, textAlign:"center", backgroundColor:"rgba(40, 57, 101, 0.9)", color: "white"}} className="testClass">
             Clientes mas frecuentes </ListHeader> }
             dataSource = {popularCustomers}
             renderRow={(row,idx)=>this.renderRow(row,idx)}
          >

          </List>
        </Card>
      </div>
    );

  }

  render() {

    const { isFetching } = this.props.appState;
    const { dashboard } = this.props.activity;
    return (


        <Page renderToolbar={ ()=> <NavBar title={"Perfil"} showMenu={this.showMenu} styles="blue" /> }>

          { isFetching || !dashboard ?
                <div style={{height:"100%",backgroundColor:"white"}}>
                  <Loading/>
                </div> :
               this.contentPage(dashboard) }

        </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    appState: state.appState,
    activity: state.activity
  };
}

export default  connect(mapStateToProps, { getListActivitiesParameter , getCustomersParameter , getCompaniesParameter , dashBoardUserData, replicateOnlyCustomer })(Main);
