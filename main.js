const id = document.getElementById("user-id")
const data = document.getElementById("user-data")
const btnGet = document.getElementById("get")
const btnPost = document.getElementById("post")
const btnPush = document.getElementById("push")
const btnDel = document.getElementById("delete")
const btnGetAll = document.getElementById("get-all")
const btnReload = document.getElementById("clr-scr")
const output = document.getElementById("output")

const getUserData = () => {
    let userID = document.getElementById("user-id").value;
    console.log('1');
    fetch('https://todonew412.herokuapp.com/api/get/'+userID)
    .then((response) => {
        return response.json();
    }).then((data) => {
        output.innerHTML = `<p1>${data.name}</p1>`
    }).catch((err) => {
        console.log(err)
    })
}
btnGet.addEventListener('click', getUserData)

const getAllUserData = () => {
    const data = fetch('https://todonew412.herokuapp.com/api/list')
    .then((response) => {
        console.log(response)
        return response.json();
    }).then((data)=>{
        for(let i = 0; i < data.length; i++){
            const dataRender = data[i]
            output.innerHTML += `<p> id: ${dataRender._id} name: ${dataRender.name}</p>`
        }
        console.log(1)
    }).catch((err)=>{
        console.log(err)
    })

}
btnGetAll.addEventListener('click', getAllUserData)

const createUserData = () => {
    let userData = document.getElementById('user-data').value;
    console.log('1')
    fetch('https://todonew412.herokuapp.com/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 
            name : userData
        })
    }).then((response) => {
        console.log('2')
        output.innerHTML= `<p>New user data: ${userData}</p>`
        return response.json();
    }).catch((err) => {
         console.log(err)
    })
}
btnPost.addEventListener('click', createUserData)

const deleteUserData = () => {
    let userID = document.getElementById("user-id").value;
    console.log('1')
    fetch('https://todonew412.herokuapp.com/api/delete/' +userID, {
        method: 'POST',
    }).then((response) => {
        console.log('2')
        output.innerHTML += `<h1 style="font-weight: bold; font-size: 20px">Data at position: ${userID} has been deleted</h1>`
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
}
btnDel.addEventListener('click', deleteUserData)

const reloadPage = () => {
    location.reload()
}
btnReload.addEventListener('click', reloadPage)

const updateUserData = () => {
    let userID = document.getElementById('user-id').value;
    let userData = document.getElementById('user-data').value;
    console.log("clicked")
    fetch('https://todonew412.herokuapp.com/api/update?id=' +userID, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userData
        })
    }).then((response) => {
        console.log('1')
        output.innerHTML += `your data at position ${userID} has been updated into ${userData}`
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
}
btnPush.addEventListener('click', updateUserData)