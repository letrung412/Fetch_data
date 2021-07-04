import React from 'react';
class Fetch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            _id:"",
            name:"",
            list:[],
            loaded:false
        }
    }
    render(){
        const {list,_id,name} = this.state;
        return(
            <div id="api">
                
                <ul>
                    {list.map(item=>(
                        <li key={item._id}>
                            <p>Id : {item._id}</p>
                            <p>Name : {item.name}</p>
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>Get All</h3>
                    <button type="submit" onClick={this.getAll}>Get All</button>
                </div>
                <div>
                    <h3>Get One</h3>
                    <input type="text" name="_id" value={_id} onChange={this.change}></input>
                    <button type="submit" onClick={()=>this.getOne(_id)}>Get One</button>
                </div>
                <form onSubmit={this.update}>
                    <h3>Update</h3>
                    <input type="text" name="_id" value={_id} onChange={this.change} placeholder="id"></input>
                    <input type="text" name="name" value={name} onChange={this.change} placeholder="name"></input>
                    <button type="submit">Update</button>  
                </form>
                <div>
                    <h3>Delete One</h3>
                    <input type="text" name="_id" value={_id} onChange={this.change}></input>
                    <button type="submit" onClick={()=>this.delete(_id)}>Delete One</button>
                </div>
                <form onSubmit={this.create}>
                    <h3>Create</h3>
                    <input type="text" name="name" value={name} onChange={this.change} placeholder="name"></input>
                    <button type="submit">Create</button>  
                </form>
            </div>
        )
    }
    change = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    getAll = () =>{
        fetch('https://todonew412.herokuapp.com/api/list')
        .then(r=>r.json())
        .then(data=>{
            this.setState({
                list:data,
                loaded:true
            })
        })
    }
    getOne = (id) =>{
        fetch('https://todonew412.herokuapp.com/api/get/'+id)
        .then(r=>r.json())
        .then(data=>{
            this.setState({
                list:[data],
            })
        })
    }
    update = e =>{
        const {_id,name} = this.state;
        e.preventDefault()
        fetch('https://todonew412.herokuapp.com/api/update?id='+_id,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({"name":name})
        }).then(r=>this.getOne(_id))
    }
    delete = () =>{
        const {_id} = this.state;
        fetch('https://todonew412.herokuapp.com/api/delete/'+_id,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
        }).then(r=>this.getAll())
    }
    create = e =>{
        const {name} = this.state;
        e.preventDefault()
        fetch('https://todonew412.herokuapp.com/api/create',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({"name":name})
        }).then(r=>this.getAll())
    }
}
export default Fetch;