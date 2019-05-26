import React, { Component } from 'react';

//flux
import { userActivities , userDayActivities , setDateFromCalendar } from '../actions';

//onsen ui
import {  Page,
} from 'react-onsenui';
import Ons from 'onsenui';

//components
import NavBar from "../components/NavBar"
import Loading from "../components/Loading";
import ActivitiesList from "./ActivitiesList";

//sources
import "../css/App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

//Libraries
import { connect } from 'react-redux';
import Calendar from "react-big-calendar";
import moment from "moment";
const localizer = Calendar.momentLocalizer(moment);


class ActivitiesCalendar extends Component {

  constructor(props)
  {
    super(props);
      this.state = {};
      this.showMenu = this.showMenu.bind(this);
      this.eventSelected = this.eventSelected.bind(this);
      console.log(this.props.login.user.usu_id);
      this.props.userActivities(this.props.login.user.usu_id);
  }

  componentDidMount(){


  }

  showMenu() {
    //console.log("show menu");
    this.props.showMenu();

  }

  eventSelected(event, e){
      console.log(event);
      console.log(e);


      let selectedDay = moment(event.start).format('Y-MM-DD');


      console.log(selectedDay);

      
      Ons.notification.confirm({title:"Espera",message:"Estas seguro de ir a la lista de actividades del día "+selectedDay}).then(res =>{
        if(res){

          //let data = { userId:this.props.login.user.usu_id , date:selectedDay } ;

          //this.props.userDayActivities(data);

          this.props.setDateFromCalendar(selectedDay);

          this.props.navigator.resetPage({component: ActivitiesList , key: "LIST_PAGE_RE"  });

          console.log("Navegar a las actividades de ese día");
        }
    });
  }

  contentPage(userActivities){

    let calendarEvents = [];

    userActivities.forEach(activity=>{
      console.log(activity);
      let formatedData = {
        start:new Date(moment(activity.fecha+" "+activity.hora_inicio+":00")),
        end:new Date(moment(activity.fecha+" "+activity.hora_final+":00")),
        title:activity.subcontratista,
      }
      console.log(formatedData);
      calendarEvents.push(formatedData);
    });

    //console.log(calendarEvents);


    const messages = {
      allDay: 'Jornada',
      previous: 'Anterior',
      next: 'Siguiente',
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      agenda: 'Agenda',
      date: 'Fecha',
      time: 'Hora',
      event: 'Evento', // Or anything you want
      showMore: total => `+ ${total} événement(s) supplémentaire(s)`
    }

    return (
      <Page id="Calendar"
        renderToolbar={ () => <NavBar backButton={true} navigator={this.props.navigator} title={"Calendario"} showMenu={this.showMenu}  />}
        >
        <div style={{backgroundColor:"white",height:"100%"}}>
          <div className="App">
            <br/>
            <Calendar
              messages = {messages}
              localizer = {localizer}
              defaultDate = {new Date()}
              defaultView = "month"
              events = {calendarEvents}
              style = {{ height: "100vh" }}
              onSelectEvent = {this.eventSelected}
            />
          </div>
        </div>
      </Page>
    );


  }

  render() {
    const { isFetching } = this.props.appState;
    const { userActivities } = this.props.activity;

    return (


        <Page renderToolbar={ ()=> <NavBar title={"Perfil"} showMenu={this.showMenu} styles="blue" /> }>

          { isFetching &&  ! userActivities > 0  ?
                <div style={{height:"100%",backgroundColor:"white"}}>
                  <Loading/>
                </div> :
               this.contentPage(userActivities) }

        </Page>
    );
  }

}

const mapStateToProps = state => {
  return {
    login: state.login,
    activity: state.activity,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { userActivities , userDayActivities, setDateFromCalendar })(ActivitiesCalendar);
