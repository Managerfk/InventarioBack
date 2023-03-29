import moment from 'moment/moment';
import React, { useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import { getMarca, editMarca, crearMarca } from '../../services/marcaService'


export const MarcaView = () => {

  const [ valoresForm, setValoresForm] = useState({});
  const [marcas, setMarcas] = useState({});
  const {nombre = '', estado=''} = valoresForm;

  const ListarMarcas = async()=>{
    try {

      const resp = await getMarca();
      setMarcas(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(()=>{
    ListarMarcas();
  })

  const handleOnChange = (e) =>{
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value})
  }



  const handleCrearMarca = async(e) =>{
    e.preventDefault();
    console.log(valoresForm)
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearMarca(valoresForm);
      setValoresForm({nombre:'', estado:''});
      Swal.close()
    } catch (error) {
      console.log(error)
      Swal.close();
      
    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearMarca(e)}>
        <div className='row'>
          <div className='col-lg-8'>
            <div className="mb-3">
              <label className="form-label">Nombre Marca</label>
              <input required name='nombre' onChange={(e) => handleOnChange(e)} type="text" className="form-control" />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select onChange={(e) => handleOnChange(e)} required name='estado' className="form-select">
                <option selected>--Seleccione--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button type="submit" className="btn btn-primary">Agregar Marca</button>
          </div>
        </div>
      </form>

      <div>
        <table className='table'>
          <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Fecha creación</th>
          </tr>
          </thead>
          <tbody>
            {
              marcas.length >0 && marcas.map((marca, index) =>{
                return (
                  <tr>
                    <th scope='row'>{index +1}</th>
                    <td>{marca.nombre}</td>
                    <td>{(marca.estado)}</td>
                    <td>{moment(marca.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
