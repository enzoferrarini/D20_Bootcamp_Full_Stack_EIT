let users=[];
let myToast = new bootstrap.Toast(document.getElementById('myToast'));

const showMessageToast=(msg)=>{
    let msgToast =document.getElementById("idMsgToast");
    msgToast.innerHTML=msg;
    myToast.show();
}

document.addEventListener('DOMContentLoaded', ()=> {    
    let btnAddUser=document.getElementById("btnAddUser");
    btnAddUser.addEventListener("click", newUser);
});

const saveLS=()=>{
    let usersAsString = JSON.stringify(users);
    localStorage.setItem("usersStore", usersAsString);
}

//VERIFICO SI HAY CONTACTOS EN EL LS SINO HAY, CREO CONTACTOS POR DEFAULT PARA MOSTRAR ALGO
if (localStorage.getItem("usersStore")) {
        let a=JSON.parse(localStorage.getItem("usersStore"));
    for (let index = 0; index < a.length; index++) {
        users.push(new User(a[index]._id, a[index]._name, a[index]._email, a[index]._pass));        
    }
}
else{
    let countId=0;
    for (let index = 0; index < usersList.length; index++) {
        let newUser=new User(usersList[index].id, usersList[index].name, usersList[index].email, usersList[index].pass);
        users.push(newUser);
    }
    saveLS();
}
   


const formulario=new Formulario();
const tablaUsers=new TablaUsuarios();
let myUsersContainer=document.getElementById("myUsersContainer");
myUsersContainer.innerHTML=tablaUsers.showUsers(users);

const cleanForm=()=>{
    const nameInput = document.getElementById("idUserName");
    const emailInput = document.getElementById("idUserEmail");
    const passInput = document.getElementById("idUserPass");
    emailInput.value="";
    nameInput.value="";
    passInput.value="";
}

const newUser=()=> {
    const nameInput = document.getElementById("idUserName");
    const emailInput = document.getElementById("idUserEmail");
    const passInput = document.getElementById("idUserPass");

    const errorName = document.getElementById("idMsgUserName");
    const errorEmail = document.getElementById("idMsgUserEmail");
    const errorPass = document.getElementById("idMsgUserPass");

    if (formulario.registrarUsuario(nameInput,errorName, emailInput,errorEmail, passInput,errorPass,users)) { 
        saveLS();
        myUsersContainer.innerHTML=tablaUsers.showUsers(users);
        cleanForm();
        showMessageToast("Usuario registrado correctamente...");
    }
}

const showpass=(iduser)=>{
    if(document.getElementById("idTd"+iduser).innerHTML!="*****")
    {
        document.getElementById("idTd"+iduser).innerHTML="*****";
    }
    else{
        const userFiltrado = users.find(usuario => usuario._id = iduser);
        document.getElementById("idTd"+iduser).innerHTML=userFiltrado._pass;
    }
}