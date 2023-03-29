import { axiosInstance } from '../helpers/axios-config'

const getUsuario = () => {
    return axiosInstance.get('usuario', {

        headers:{
            'content-type':'application/json'
        }
    });
}

const crearUsuario = (data) =>{
    return axiosInstance.post('usuario',data,{

        headers:{
            'content-type':'application/json'

        }
    });
}

const editUsuario = (usuarioId,data) =>{
    return axiosInstance.put(`usuario/${usuarioId}`,data,{

        headers:{
            'content-type':'application/json'
        }
    });
}

export {
    getUsuario,crearUsuario,editUsuario
}