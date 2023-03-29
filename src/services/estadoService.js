import { axiosInstance } from '../helpers/axios-config'

const getEstado = () => {
    return axiosInstance.get('estadoequipo', {

        headers:{
            'content-type':'application/json'
        }
    });
}

const crearEstado = (data) =>{
    return axiosInstance.post('estadoequipo',data,{

        headers:{
            'content-type':'application/json'

        }
    });
}

const editEstado = (estadoId,data) =>{
    return axiosInstance.put(`estadoequipo/${estadoId}`,data,{

        headers:{
            'content-type':'application/json'
        }
    });
}

export {
    getEstado,crearEstado,editEstado
}