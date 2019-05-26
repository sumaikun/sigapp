import React, { Component } from 'react';

// Onsen ui
import {  Page, Row , Card, List, ListItem, ListHeader, Icon, Button, ProgressBar
} from 'react-onsenui';
import Ons from 'onsenui';

// Componentes
import NavBar from "../components/NavBar";
import ActivitiesCalendar from "./ActivitiesCalendar";
import Register from "./Register";
//Libraries
import { connect } from 'react-redux';

//resources
import blueBackground from "../img/anime.jpg";

//flux
import { userDayActivities , setActivityToedit , replicateActivity } from '../actions';

const styles = {
  superCenter:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    textAlign: "center"
  },
  backgPage:{backgroundImage:"url("+blueBackground+")", height:"100%", overflow:"auto"},
  customIcons:{color:"rgba(40, 57, 101, 0.9)",marginLeft:"5%",marginRight:"5%",marginTop:"25%"}
}

class ActivitiesList extends Component {

  constructor(props)
  {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }

  componentDidMount(){

      let user = this.props.login.user;

    if(this.props.activity.userActivities.length == 0 )
    {


      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      let formatToday = yyyy + '-' + mm + '-' + dd ;

      let data = { userId:user.usu_id , date:formatToday } ;

      this.props.userDayActivities(data);

      this.dateFilter.value = formatToday;
    }
    else{

      if(this.props.activity.dateFromCalendar)
      {
          let data = { userId:user.usu_id , date:this.props.activity.dateFromCalendar } ;
          this.props.userDayActivities(data);
          this.dateFilter.value = this.props.activity.dateFromCalendar;
      }

    }

  }

  showMenu() {
    //console.log("show menu");
    this.props.showMenu();
  }

  filterByDate() {

    let user = this.props.login.user;

    let data = { userId:user.usu_id , date:this.dateFilter.value };

    this.props.userDayActivities(data);
  }

  editActivity(activity){
    console.log(activity);
    console.log("editActivity");

    this.props.setActivityToedit(activity);

    this.props.navigator.pushPage({component: Register , key: "REGISTER_EDIT_PAGE", props: {editMode:true} });
  }

  renderRow(row,idx) {
    return (
      <ListItem key={idx}>
        <div >
          <span className = "list-item__title">{ row.descripcion }</span>
          <br/>
          <span className="list-item__subtitle">{ row.hora_inicio  } - { row.hora_final  }</span>
          <br/>
          <span style={{fontSize:"8px"}} className="list-item__subtitle">{ row.customers.nombre  }</span>
        </div>
        <div>
        </div>
        <div className='right'>
          <span className="list-item__subtitle">
              <Icon icon='edit' style={styles.customIcons}  onClick={()=>{this.editActivity(row)}}  />
              <br/>
              <Icon icon='refresh' style={styles.customIcons} onClick={()=>{
                  this.props.replicateActivity(row);
                  this.props.navigator.pushPage({component: Register , key: "REGISTER_REPLICATE", props: {replicateMode:true}  });
              }} />
          </span>
        </div>
      </ListItem>
    );
  }

  render() {

    const { isFetching , userActivities } = this.props.activity;

    return (
      <Page id="ListActivities"
        renderToolbar={ () => <NavBar title={"Lista de actividades"} showMenu={this.showMenu}  />}>
        <div style={styles.backgPage}>

         { isFetching ? <ProgressBar indeterminate  /> : null }

          <Card>
            <Row>
              <div style={styles.superCenter}>

                <Button modifier="large--cta" style={{backgroundColor:"grey"}}
                 onClick={()=>this.props.navigator.pushPage({component: ActivitiesCalendar , key: "CALENDAR_PAGE" })}
                >
                  Calendario
               </Button>

                <form>
                  <label style={{color:"black",fontWeight:"bold"}}>Fecha de la actividad</label>
                  <input type="date" id="fecha" name="fecha" ref={(input) => this.dateFilter = input}   style={{marginTop:"5%"}}/>
                  <Button modifier="large--cta" style={{backgroundColor:"#38468a"}}  onClick={this.filterByDate} >
                    Filtrar
                 </Button>
               </form>

             </div>
            </Row>
          </Card>
          <Card>

            { userActivities.length > 0 ?
            <List
              dataSource = {userActivities}
              renderRow={(row,idx)=>this.renderRow(row,idx)}
              calculateItemHeight={() => Ons.platform.isAndroid() ? 48 : 44}
            />: <span> <b> No se encuentran actividades para este día. </b> </span> }

          </Card>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    activity: state.activity
  };
}

export default  connect(mapStateToProps, { userDayActivities , setActivityToedit , replicateActivity })(ActivitiesList);
