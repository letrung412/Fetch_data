import React from 'react';
class Fetch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            _id:"",
            name:"",
            list:[],
            listNew:[],
            loaded:false,
            itemPerPage:10,
            pages:[],
            offset:0,
            currentPage:0,
            pageCount:0
        }
    }
    render(){
        const {_id,name,listNew,pages} = this.state;
        return(
            <div id="api">
                
                <ul>
                    {listNew.map(item=>(
                        <li key={item._id}>
                            <p>Id : {item._id}</p>
                            <p>Name : {item.name}</p>
                        </li>
                    ))}
                </ul>
                <div id="page">
                    <h4>PAGE</h4>
                        {pages.map(page=>(
                            <p key={page} onClick={()=>this.page(page)}>{page}</p>
                        ))}
                </div>
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
    page(num){
        this.setState({
            currentPage:num,
        })
        this.getAll();
    }
    getAll = () =>{
        const {itemPerPage} = this.state;
        fetch('https://todonew412.herokuapp.com/api/list')
        .then(r=>r.json())
        .then(data=>{
            const sliceData = data.slice(this.state.offset,this.state.offset+this.state.itemPerPage)
            const a = function(){
                let arr = []
                for(let i=0;i<data.length/itemPerPage;i++){
                    arr.push(i)
                }
                return arr;
            }
            this.setState({
                list:data,
                loaded:true,
                listNew:sliceData,
                offset:this.state.currentPage*this.state.itemPerPage,
                pageCount:Math.ceil(data.length/itemPerPage),
                pages:a()
            })
        })
    }
    getOne = (id) =>{
        fetch('https://todonew412.herokuapp.com/api/get/'+id)
        .then(r=>r.json())
        .then(data=>{
            this.setState({
                listNew:[data],
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