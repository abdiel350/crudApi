import React,{Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from "axios";
import Header  from "./Header";
import Navegacion from "./Navegacion";
import Envioposts from  "./Envioposts";
import SinglePost from "./SinglePost";
import Formulario from "./Formulario";
import Swal from 'sweetalert2'
import Editar from "./Editar";

class Rutas extends Component{
    state={
        posts:[]
    }

    componentDidMount(){
        this.obtenerPost();
    }

    obtenerPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
             .then(res => {
                this.setState({
                    posts:res.data
                })
                        
             })
    }

    borrarPost = (id) =>{
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res=>{
          if(res.status===200){
              const posts =[...this.state.posts];
              let resultado = posts.filter(post =>(
                    post.id!==id
              ));
              this.setState({
                  posts:resultado
              })
            }                   
        })
    }

    crearPost = (post) =>{
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
        .then(res => {
            if(res.status === 201) {

                Swal.fire(
                    'Post Creado',
                    'Se creo correctamente!',
                    'success'
                  )
             
                let postId = {id: res.data.id};
               const nuevoPost = Object.assign({}, res.data.post, postId);

               this.setState(prevState => ({
                   posts: [...prevState.posts, nuevoPost]
               }))
            }
        })

    }

    editarPost = (postActualizado) => {
    

         const {id} = postActualizado;

         axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado})
            .then(res => {
                if(res.status === 200) {

                    Swal.fire(
                        'Post Actualizado',
                        'Se guard?? correctamente',
                        'success'
                    )

                    let postId = res.data.id;

                    const posts = [...this.state.posts];

                    const postEditar = posts.findIndex(post => postId === post.id );

                    posts[postEditar] = postActualizado;

                    this.setState({
                        posts
                    })
                }
            })
     }



         render(){
            return(
             <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                        <Navegacion/>
                        <Switch>
                            <Route exact path="/" render={ () => {
                                return(
                                    <Envioposts
                                        posts={this.state.posts}
                                        borrarPost={this.borrarPost}
                                    />
                                   )
                               }}    
                            />    
                                  <Route exact path="/post/:postId" render={ (props) => { 
                                        let idPost = props.location.pathname.replace('/post/','');

                                        //haciendo el filtrado especifico de lo que queremos imprimir por id
                                        const posts =this.state.posts;
                                        let filtro;
                                        
                                        filtro = posts.filter(post => (
                                            post.id === Number(idPost)
                                        ))

                                        return(                                        
                                        <SinglePost
                                        post={filtro[0]}
                                        
                                        />
                                      )   
                                  }}     
                                  />     
                                 <Route exact path="/crear" render={ () => {
                                            return(
                                                <Formulario 
                                                    crearPost={this.crearPost}
                                                />
                                            )
                                    }}
                                    />

                                        <Route exact path="/editar/:postId" render={ (props) => { 
                                        let idPost = props.location.pathname.replace('/editar/','');

                                        //haciendo el filtrado especifico de lo que queremos editar por id
                                        const posts =this.state.posts;
                                        let filtro;
                                        
                                        filtro = posts.filter(post => (
                                            post.id === Number(idPost)
                                        ))

                                        return(                                        
                                        <Editar
                                        post={filtro[0]} 
                                        editarPost={this.editarPost}                                 
                                        />
                                      )   
                                  }}     
                                  />    
                        </Switch>

                    </div>
                </div>    
             </BrowserRouter>            
            );            
        }
}


export default Rutas;