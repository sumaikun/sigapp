import {fromJS} from 'immutable'

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null){
      return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    //console.log(JSON.parse(serializedData));
    return JSON.parse(serializedData);
    //return fromJS(JSON.parse(serializedData)) // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}

export const saveState = (state) => {
  try {

    let serializedData = JSON.stringify(fromJS(state).toJS())
    localStorage.setItem('state', serializedData)


    //console.log(localStorage.getItem('state'));
  } catch (error) {
    console.log("error salvando el estado");
    console.error(error);
    console.log(state);
	// Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
  }
}
