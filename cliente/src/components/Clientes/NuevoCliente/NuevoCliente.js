import React, { Component, Fragment } from 'react'

// Mutations
import { NUEVO_CLIENTE } from './../../../mutations';
import { Mutation } from 'react-apollo';


class NuevoCliente extends Component {

    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            tipo: ''
        },
        error: false,
        emails: []
    }

    nuevoCampoEmail = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        })
    }

    eliminarCampoEmail = (i) => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })
    }

    leerCampoEmail = (i) => (e) =>{
        const nuevoEmail = this.state.emails.map((email, index) => {
            if(i !== index) {
                return email
            } else {
                return {
                    ...email,
                    email: e.target.value
                }
            }
        })

        this.setState({
            emails: nuevoEmail
        })
    }

    render() {
        const { error } = this.state;
        let respuesta = (error ? <p className="alert alert-danger p-3 text-center">Todos los campos son Obligatoios</p> : '');
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {respuesta}
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={NUEVO_CLIENTE}
                        onCompleted={() => this.props.history.push('/')}>

                        { crearCliente => (
                            <form className="col-md-8 m-3"
                                onSubmit={ e => {
                                    e.preventDefault();

                                    const { nombre, apellido, empresa, edad, tipo } = this.state.cliente;
                                    const { emails } = this.state;

                                    if(nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '') {
                                        this.setState({
                                            error: true
                                        });
                                        return;
                                    }

                                    this.setState({
                                        error: false
                                    });

                                    const input = {
                                        nombre,
                                        apellido,
                                        empresa, 
                                        edad: Number(edad),
                                        tipo, 
                                        emails
                                    }

                                    crearCliente({
                                        variables: {input}
                                    })
                                    
                                    
                                }}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Nombre" 
                                            onChange = { e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        nombre: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Apellido"
                                            onChange = { e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        apellido: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Empresa"
                                            onChange = { e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        empresa: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    {this.state.emails.map((input, index) => (
                                        <div key={index} className="from-group col-md-12">
                                            <label>Correo: {index + 1}</label>
                                            <div className="input-group">
                                                <input onChange={this.leerCampoEmail(index)} type="email" placeholder="Email" className="form-control" />
                                                <div className="input-group-append">
                                                    <button onClick={this.eliminarCampoEmail(index)} type="button" className="btn btn-danger"> &times; Eliminar </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-md-12 mt-4">
                                        <button onClick={this.nuevoCampoEmail} type="button" className="btn btn-warning">
                                            Agregar Email
                                        </button>
                                    </div>
                                    {/* <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            onChange = { e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        email: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div> */}
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Edad"
                                            onChange = { e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        edad: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div 
                                    onChange = { e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                tipo: e.target.value
                                            }
                                        })
                                    }}
                                    className="form-group col-md-6">
                                        <label>Tipo Cliente</label>  
                                        <select className="form-control">
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Crear Cliente</button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default NuevoCliente;