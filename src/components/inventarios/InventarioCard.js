import React from 'react'

export const InventarioCard = (props) => {

    const { inventario } = props;

  return (
    <div className="col">
        <div className="card">
        <img src={inventario.foto} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">Características</h5>
            <hr/>
            <p className="card-text">{ `Serial: ${inventario.serial} ` }</p>
            <p className="card-text">{ `Marca: ${inventario.marca.nombre} ` }</p>
            <p className="card-text">{ `Descripción: ${inventario.descripcion} ` }</p>
            <p className="card-text">{ `Usuario: ${inventario.usuario.nombre} ` }</p>
            <p className="card-text">
            <a>ver más...</a>
            </p>
        </div>
        </div>
    </div>
  )
}
