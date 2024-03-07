class User {
    constructor(id, name, email, pass) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._pass = pass;
      }
    
    get id() {return this._id;}
    get name() {return this._name;}    
    get email() {return this._email;}    
    get pass() {return this._pass;}    

    set name(newName) {this._name = newName;}
    set email(newEmail) {this._email = newEmail;}
    set pass(newPass) {this._pass = newPass;}    
  }

class Formulario {    
    validName(nameInput,errorName){
        let validValue=true;
        let name=nameInput.value; 
        if (verificarNoVacio(name)){                
            if(validarLongitudCadena(nameInput.value, 3, 1000)){
                cleanMsgError(nameInput,errorName);
            }
            else {
                let msg="Mínimo 3 caracteres";
                showMsgError(nameInput,errorName,msg);
                validValue=false;
            }               
        }
        else
        {
            let msg="Campo Obligatorio";
            showMsgError(nameInput,errorName,msg);
            validValue=false;
        }
        return validValue;
    }

    validEmail(emailInput,errorEmail){ 
        let validValue=true;       
        let email=emailInput.value;
        if (verificarNoVacio(email)){
            if(validarEmail(email)){
                cleanMsgError(emailInput,errorEmail);
            }
            else {
                let msg="E-mail inválido";
                showMsgError(emailInput,errorEmail,msg);
                validValue=false;
            }
        }else{
            let msg="Campo Obligatorio";
            showMsgError(emailInput,errorEmail,msg);
            validValue=false;
        }   
        return validValue;     
    }

    validPass(passInput,errorPass){
        let validValue=true;       
        let pass=passInput.value;
        if(validarPassword(pass)){
            cleanMsgError(passInput,errorPass);
        }
        else{
            let msg="Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
            showMsgError(passInput,errorPass,msg);
            validValue=false;
        }
        return validValue;
    }

    validarDatos(nameInput,errorName, emailInput,errorEmail, passInput,errorPass) {        
        if (this.validName(nameInput,errorName) & this.validEmail(emailInput,errorEmail) & this.validPass(passInput,errorPass)) 
            return true;
        else
            return false;
    }

    registrarUsuario (nameInput,errorName, emailInput,errorEmail, passInput,errorPass,users){
        if(this.validarDatos(nameInput,errorName, emailInput,errorEmail, passInput,errorPass))
        {
            const newUserId=users.length+1;
            const nuevoUsuario = new User(newUserId, nameInput.value.trim(), emailInput.value.trim(), passInput.value.trim());
            users.push(nuevoUsuario);
            return users;
        }

    }
}

class TablaUsuarios {   
    createUser =(element)=>{
        let value=`<tr  id="${element.id}">
            <td class="pt-2 pb-2 text-start d-blue text-wrap">${element.name}</td>
            <td class="pt-2 pb-2 align-middle text-start ">${element.email}</td>           
            <td id="idTd${element.id}" class="pt-2 pb-2 align-middle text-center">*****</td>           
            <td class="pt-2 pb-2 align-middle text-center">
                <i class="fa-regular fa-eye" onclick="showpass(${element.id})"></i>
           </td>           
        </tr>`;
        return value;
    }
    showpass=()=>{
        alert();
    }

    showUsers=(users)=>{ 
        users.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        let count=0;
        let htmlCode="";
        let listUsers="";
    
        users.forEach((objeto) => {
            count++;
            listUsers+=this.createUser(objeto);
        });
        
        if(users.length==0)
        {
            htmlCode='<div class="alert alert-info text-center" role="alert">No se han encontrado Usuarios</div>';
        }
        else
        {
            htmlCode=`
            <div class="table-responsive">
                <table class="table table-hover table-sm">
                    <thead>
                        <tr class=" fw-normal fs-6 ">
                            <th scope="col" class="text-wrap">Usuario</th>
                            <th scope="col" class="text-center">E-mail</th>
                            <th scope="col" class="text-center">Password</th>
                            <th scope="col" class="text-center">Acciones</th>                       
                        </tr>                
                    </thead>
                    <tbody>
                        ${listUsers}
                    </tbody>
                </table>
                <div  class="form-text text-start text-secondary">${count} usuario/s</div>
                
            </div>`; 
            
            
        }
        return htmlCode;
    }
}
