import React, { Component } from 'react';


import '../css/loading.css';

const styles = {
  loadingApp:{
    background: 'rgba(40, 57, 101, 0.9)',
    width: '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'hidden'
  }

}



class Loading extends Component {

  constructor(props) {
    super(props);
    //console.log(props);
  }

  render() {
    return (
    <div style={styles.loadingApp}>
      <div class="bar" style={{width:"40%",height:"0px"}}>
        <div class="circle"></div>
        <p>Cargando</p>
      </div>
    </div>
    );
  }
}


export default Loading;
