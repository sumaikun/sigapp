import React, { Component } from 'react';
//libraries
import Select from 'react-select';
import { connect } from 'react-redux';

//Onsen ui
import {  Page, Row, ProgressBar
} from 'react-onsenui';
import Ons from 'onsenui';

//Components
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
//import ActivitiesList from "./ActivitiesList";
//sources
import '../css/form.css';

import blueBackground from '../img/Bluebackground.jpg';

import boxBackground from '../img/backgroundBox.png';


//flux
import { registerActivity , updateActivity , userDayActivities } from '../actions';

const styles = {
  backgPage:{backgroundImage:"url("+blueBackground+")", height:"100%", overflow:"auto"},
  formBackg:{backgroundImage:"url("+boxBackground+")"},
  selectSearch:{width:"100%",marginTop:"2%"}
}

class Register extends Component {

  constructor(props)
  {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.submitActivity = this.submitActivity.bind(this);
    this.data = {};
    this.state = { isDisable:false ,  selectSearch:{} , formData:{}  } ;
    this.setEditInfo = this.setEditInfo.bind(this);
    this.setReplicateInfo = this.setReplicateInfo.bind(this);
    this.handleChangeDataSelect = this.handleChangeDataSelect.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.replicateOnlyCustomer = this.replicateOnlyCustomer.bind(this);
    //console.log(this.props);

    this.contentPage = this.contentPage.bind(this);

  }

  componentDidMount(){


    if(this.props.editMode)
    {
        this.setState({ isDisable:true } );
    }

    console.log(this);

    this.props.activity.isFetching ? this.props.activity.isFetching = false : null;


    //Tipos de actividad

    this.listActivities = [];

    const { list } = this.props.kindOfactivity;

    list.forEach((element)=>{
      this.listActivities.push({label:element.nombre,value:element.id});
    })

    console.log(this.listActivities);

    //empresas

    console.log(this.props.enterprises);

    const { customers, companies } = this.props.enterprises;

    this.Enterprises = [];

    companies.forEach((element)=>{
      this.Enterprises.push({label:element.nombre,value:element.id});
    })

    console.log(this.Enterprises);

    //clientes

    this.Customers = [];

    customers.forEach((element)=>{
      this.Customers.push({label:element.nombre,value:element.id});
    })

    console.log(this.Customers);

    if(this.props.editMode)
    {
          this.setEditInfo();
    }
    else{
      this.props.activity.activityToedit = null;
    }

    if(this.props.replicateMode)
    {
       this.replicateInfo();
    }
    else{
      this.props.activity.activityToReplicate  = null;
    }

    if(this.props.replicateCustomer)
    {
      this.replicateOnlyCustomer();
    }
    else{
      this.props.activity.customerToReplicate = null;
    }

  }

  replicateOnlyCustomer()
  {
      let clienteFiltered = this.props.enterprises.customers.filter( customer => {
        return customer.id === this.props.activity.customerToReplicate;
      })[0]

      console.log(clienteFiltered);

      this.data.cliente.state.value = { label: clienteFiltered.nombre , value: clienteFiltered.id };
  }

  replicateInfo(){
      let actividadFiltered = this.props.kindOfactivity.list.filter( actividad => {
        return actividad.id === this.props.activity.activityToReplicate.tp_actividad;
      })[0]

      console.log(actividadFiltered);

      console.log(this.data.actividad);

      this.setState({
        selectSearch:{
          ...this.state.selectSearch,
          actividad:{ label: actividadFiltered.nombre , value: actividadFiltered.id }
        }
      },()=>{
        console.log(this.state);
      });

      let empresaFiltered = this.props.enterprises.companies.filter( ent => {
        return ent.id === this.props.activity.activityToReplicate.tp_propia;
      })[0]

      console.log(empresaFiltered);

      this.data.empresa.state.value = { label: empresaFiltered.nombre , value: empresaFiltered.id };

      let clienteFiltered = this.props.enterprises.customers.filter( customer => {
        return customer.id === this.props.activity.activityToReplicate.tp_empresa;
      })[0]

      console.log(clienteFiltered);

      this.data.cliente.state.value = { label: clienteFiltered.nombre , value: clienteFiltered.id };

      //Normal Inputs

      this.data.filial.value = this.props.activity.activityToReplicate.filial;
      this.data.subcontratista.value = this.props.activity.activityToReplicate.subcontratista;
  }

  setEditInfo() {

    let actividadFiltered = this.props.kindOfactivity.list.filter( actividad => {
      return actividad.id === this.props.activity.activityToedit.tp_actividad;
    })[0]

    console.log(actividadFiltered);

    console.log(this.data.actividad);

    this.setState({
      selectSearch:{
        ...this.state.selectSearch,
        actividad:{ label: actividadFiltered.nombre , value: actividadFiltered.id }
      }
    },()=>{
      console.log(this.state);
    });

    let empresaFiltered = this.props.enterprises.companies.filter( ent => {
      return ent.id === this.props.activity.activityToedit.tp_propia;
    })[0]

    console.log(empresaFiltered);

    this.data.empresa.state.value = { label: empresaFiltered.nombre , value: empresaFiltered.id };

    let clienteFiltered = this.props.enterprises.customers.filter( customer => {
      return customer.id === this.props.activity.activityToedit.tp_empresa;
    })[0]

    console.log(clienteFiltered);

    this.data.cliente.state.value = { label: clienteFiltered.nombre , value: clienteFiltered.id };

    //Normal Inputs

    this.data.fecha.value = this.props.activity.activityToedit.fecha;
    this.data.filial.value = this.props.activity.activityToedit.filial;
    this.data.subcontratista.value = this.props.activity.activityToedit.subcontratista;
    this.data.descripcion.value = this.props.activity.activityToedit.descripcion;
    this.data.horaInicial.value = this.props.activity.activityToedit.hora_inicio;
    this.data.horaFinal.value = this.props.activity.activityToedit.hora_final;

  }

  setReplicateInfo()
  {

  }

  showMenu() {
    //console.log("show menu");


    this.props.showMenu();
  }

  submitActivity(event){

    event.preventDefault();


    let activityToRegister = {
      fecha:this.data.fecha.value,
      actividad:this.state.selectSearch.actividad.value,
      cliente:this.data.cliente.state.value.value,
      empresa:this.data.empresa.state.value.value,
      filial:this.data.filial.value,
      subcontratista:this.data.subcontratista.value,
      descripcion:this.data.descripcion.value,
      hora_inicial:this.data.horaInicial.value,
      hora_final:this.data.horaFinal.value,
      usuario:this.props.login.user.usu_id
    }

    //console.log(activityToRegister);

    if(!this.props.editMode)
    {
      let successCallBack = () => {
        //console.log("actividad registrada");
        Ons.notification.alert({title:"Ok",message:"¡Actividad registrada!"});
        this.myFormRef.reset();
        this.data.actividad.state.value = {label:'',value:''};
        this.data.cliente.state.value = {label:'',value:''};
        this.data.empresa.state.value = {label:'',value:''};
      }

      this.props.registerActivity(activityToRegister,successCallBack);
    }else{
      let successCallBack = () => {
        //console.log("actividad registrada");
        Ons.notification.alert({title:"Ok",message:"¡Actividad actualizada!"});

        //this.props.navigator.resetPage({component: ActivitiesList , key: "BACK_TO_MENU_AFTER_UPDATE" });

      }
      let id = this.props.activity.activityToedit.id;
      this.props.updateActivity(activityToRegister,id,successCallBack);
    }

  }

  handleChangeDataSelect(selectedOption,action){

    console.log(selectedOption);
    console.log(action);

    if(!selectedOption)
    {
      selectedOption = {
        value:'',
      }
    }

    this.setState(
      {
        formData:{
            ...this.state.formData,
            [action.name] : selectedOption.value,
        },
        selectSearch:{
          ...this.state.selectSearch,
          [action.name]:selectedOption
        }
      },() => {
        console.log(this.state);
      }
    );
    //console.log(selectedOption);
    //console.log(action);
  }

  enableForm(){

      /*this.setState({ isDisable: !this.state.isDisable },()=>{
        console.log(this.state);
      });*/

      this.setState({ isDisable: false },()=>{
        console.log(this.state);
      });
  }

  contentPage(){
    return(



        <div style={styles.backgPage}>

          { this.props.editMode ?
            <div style={{
              color: "white",
              "text-align": "center"}}>
              Por su seguridad estan deshabilitados los cambos click <button onClick={this.enableForm}>Aqui</button> para habilitar
            </div> : null   }

          <form  ref={(el) => this.myFormRef = el} style={styles.formBackg} method="post" onSubmit={this.submitActivity}>

            <Row>
              <label>Fecha</label>
              <input type="date" id="fecha" name="fecha" ref={(input) => this.data.fecha = input}  disabled={this.state.isDisable} required />
            </Row>
            <Row>
              <label>Actividad</label>
              <div style = {styles.selectSearch}>
              <Select
                value={this.state.selectSearch.actividad}
                onChange={this.handleChangeDataSelect}
                name={"actividad"}
                ref={(input) => this.data.actividad = input}
                isClearable={"true"}
                options={this.listActivities}
                isDisabled={this.state.isDisable}
              />
              </div>
            </Row>
            <Row>
              <label>Cliente</label>
              <div style = {styles.selectSearch}>
              <Select
                ref={(input) => this.data.cliente = input}
                isClearable={"true"}
                options={this.Customers}
                isDisabled={this.state.isDisable}
              />
              </div>
            </Row>
            <Row>
              <label>Empresa</label>
              <div style = {styles.selectSearch}>
              <Select
                ref={(input) => this.data.empresa = input}
                isClearable={"true"}
                options={this.Enterprises}
                isDisabled={this.state.isDisable}
              />
              </div>
            </Row>
            <Row>
              <label>filial/lugar</label>
              <input type="text" ref={(input) => this.data.filial = input}  placeholder="Filial/Lugar" name="filial" disabled={this.state.isDisable}    />
            </Row>
            <Row>
              <label>subcontratista</label>
              <input type="text" ref={(input) => this.data.subcontratista = input}  placeholder="subcontratista" name="subcontratista" disabled={this.state.isDisable}    />
            </Row>
            <Row>
              <label>Descripción de la actividad</label>
              <textarea type="text" ref={(input) => this.data.descripcion = input}  placeholder="descripcion" name="subcontratista" disabled={this.state.isDisable}    required />
            </Row>
            <Row>
              <label>Hora inicial</label>
              <input type="time" id="horaInicial" ref={(input) => this.data.horaInicial = input}  name="hora_inicial" disabled={this.state.isDisable}   required />
            </Row>
            <Row>
              <label>Hora final</label>
              <input type="time" id="horaFinal" ref={(input) => this.data.horaFinal = input}  name="hora_final" disabled={this.state.isDisable} required />
            </Row>
            <input type="submit" name="submit" disabled={this.state.isDisable} value={this.props.activity.buttonSubmitTitle} />
          </form>

        </div>


    );
  }


  render() {



      const { isFetching } = this.props.activity;

      //const { customers, companies } = this.props.enterprises;

     return (

       <Page id="register"
         renderToolbar={ () => !this.props.editMode  ? <NavBar title={"Registrar actividad" } showMenu={this.showMenu}  navigator={this.props.navigator}  />
           : <NavBar title={ "Editar actividad" } showMenu={this.showMenu} backButtonAction={()=>{
             let data = {};
             data.userId = this.props.activity.activityToedit.usuario;
             data.date = this.props.activity.activityToedit.fecha;
             this.props.userDayActivities(data);

           }} backButton={this.props.editMode} navigator={this.props.navigator}  />
         }>
          { isFetching ? <ProgressBar indeterminate  /> : null }

          { isFetching  ?
                <div style={{height:"100%",backgroundColor:"white"}}>
                  <Loading/>
                </div> :
               this.contentPage() }

        </Page>

    );
  }
}


const mapStateToProps = state => {
  return {
    login: state.login,
    activity: state.activity,
    kindOfactivity: state.kindOfactivity,
    enterprises: state.enterpriseParameter
  };
}

export default  connect(mapStateToProps, { registerActivity, updateActivity , userDayActivities })(Register);
