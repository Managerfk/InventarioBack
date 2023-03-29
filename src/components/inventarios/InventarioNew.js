import React, {useState, useEffect} from 'react'
import {getEstado } from '../../services/estadoService'
import {getMarca} from '../../services/marcaService'
import {getTipo} from '../../services/tipoService'
import {getUsuario} from '../../services/usuarioService'
import { crearInventario } from '../../services/inventarioService'
import Swal from 'sweetalert2'


export const InventarioNew = ({ handleOpenModal }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial ='', model ='', descripcion ='', color ='', foto ='', fechaCompra ='', precio ='',usuario='',marca='',estadoEquipo='',tipoEquipo='' }= valoresForm;
    



    const listarUsuarios = async() =>{
        try {
            const {data} = await getUsuario();
            setUsuarios(data);
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(()=>{
        listarUsuarios();
    }, []);

    const listarMarcas = async() =>{
        try {
            const {data} = await getMarca();
            setMarcas(data);
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(()=>{
        listarMarcas();
    }, []);

    const listarTipos = async() =>{
        try {
            const {data} = await getTipo();
            setTipos(data);
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(()=>{
        listarTipos();
    }, []);

    const listarEstados = async() =>{
        try {
            const {data} = await getEstado();
            setEstados(data);
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(()=>{
        listarEstados();
    }, []);

    const handleOpenChange = ({ target })=>{
        const { name, value } = target;
        setValoresForm({...valoresForm, [name]:value})
    };

    const handleOnSubmit = async(e) =>{
        e.preventDefault();
        const inventario ={
            serial, model, descripcion, color, foto, fechaCompra, precio, 
            usuario:{
                _id: usuario,
            },
            marca:{
                _id: marca,
            },
            tipoEquipo:{
                _id: tipoEquipo,
            },
            estadoEquipo:{
                _id: estadoEquipo,
            }
        }
        console.log(inventario);

        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await crearInventario(inventario)
            console.log(data);
            Swal.close();
            handleOpenModal();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo inventario</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" required name='serial' value={serial} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" required name='model' value={model} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <input type="text" required name='descripcion' value={descripcion} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input type="text" required name='color' value={color} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="text" required name='foto' value={foto} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Compra</label>
                                <input type="date" required name='fechaCompra' value={fechaCompra} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input type="number" required name='precio'value={precio} onChange={(e) => handleOpenChange(e)} className="form-control"/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select" required onChange={(e)=>handleOpenChange(e)} name='usuario' value={usuario}>
                                    <option value=''>--Seleccione--</option>
                                    {
                                        usuarios.map(({_id,nombre}) => {
                                            return <option key={_id} value={_id}>{ nombre }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select className="form-select" required onChange={(e)=>handleOpenChange(e)} name='marca' value={marca}>
                                <option value=''>--Seleccione--</option>
                                {
                                        marcas.map(({_id,nombre}) => {
                                            return <option key={_id} value={_id}>{ nombre }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo equipo</label>
                                <select className="form-select" required onChange={(e)=>handleOpenChange(e)} name='tipoEquipo' value={tipoEquipo}>
                                <option value=''>--Seleccione--</option>
                                {
                                        tipos.map(({_id,nombre}) => {
                                            return <option key={_id} value={_id}>{ nombre }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado Equipo</label>
                                <select className="form-select" required onChange={(e)=>handleOpenChange(e)} name='estadoEquipo' value={estadoEquipo}>
                                <option value=''>--Seleccione--</option>
                                {
                                        estados.map(({_id,nombre}) => {
                                            return <option key={_id} value={_id}>{ nombre }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <button type="submit" className="btn btn-primary">Agregar al inventario</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
