import { axiosInstance } from '../helpers/axios-config'

const getTipo = () => {
    return axiosInstance.get('tipoequipo', {

        headers:{
            'content-type':'application/json'
        }
    });
}

const crearTipo = (data) =>{
    return axiosInstance.post('tipoequipo',data,{

        headers:{
            'content-type':'application/json'

        }
    });
}

const editTipo = (tipoId,data) =>{
    return axiosInstance.put(`tipoequipo/${tipoId}`,data,{

        headers:{
            'content-type':'application/json'
        }
    });
}

export {
    getTipo,crearTipo,editTipo
}