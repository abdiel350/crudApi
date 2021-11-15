import React,{Component} from 'react';

 class Formulario extends Component {
    
    //Creando los refs
    tituloRef = React.createRef();
    contenidoRef = React.createRef();


    crearPost=(e) =>{
        e.preventDefault();
        //leer los refs
        const post={
            title: this.tituloRef.current.value,
            body:this.contenidoRef.current.value,
            userId:1
        }
       //enviado datos mediante props
       this.props.crearPost(post);

    }

    render() {
        return (
         <form onSubmit={this.crearPost} className="col-8">
             <legend className="text-center">Crear Nuevo Post</legend>
             <div className="form-group">
                 <label>Titulo del Post</label>
                 <input type="text" ref={this.tituloRef} className="form-control" placeholder="Titulo del Post"/>
             </div>

             <div className="form-group">
                 <label>Contenido:</label>
              <textarea className="form-control" ref={this.contenidoRef} placeholder="Contenido..."></textarea>
             </div>

             <button type="submit" className="btn btn-primary">Crear</button>
         </form>
         
        );
    }
}

export default Formulario;