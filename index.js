const sendInfo = async () => {
   //captura de los datos del form
   var usercode = document.getElementById("fieldCodigo").value;
   var user = document.getElementById("fieldUsuario").value;
   var name = document.getElementById("fielNombre").value;
   var position = document.getElementById("fieldCargo").value;
   var phone = document.getElementById("fieldTel").value;
   var email = document.getElementById("fieldmail").value;
   var itdcontact = document.getElementById("boxITDContacto").value;
   var bwebstore = document.getElementById("checkWebStore").checked;
   var borders = document.getElementById("checkOrdenes").checked;
   var binfo = document.getElementById("checkInfo").checked;

   //Validaciones de información
   if (!validarUser(user)) {
      alert('El usuario debe iniciar por "XMX"');
      return;
   }
   if (!checkName(name)) {
      alert("La longitud del nombre debe ser entre 5 y 15 caracteres");
      return;
   }
   if (!checkPosition(position)) {
      alert("La longitud del cargo debe ser entre 5 y 15 caracteres");
      return;
   }
   if (!checkPhone(phone)) {
      alert("El número telefónico debe empezar con +57 y contener 7 número más");
      return;
   }

   //creación del objeto de información
   let data = {
      usercode,
      user,
      name,
      position,
      phone,
      email,
      itdcontact,
      bwebstore,
      borders,
      binfo,
   };

   //realiación de la petición para enviar la información
   JRespuesta = await sendData(data);
   //se lee la respuesta y se notifica al usuario del resultado de la operación
   if (JRespuesta.headers.resultado) {
      alert("Registro exitoso");
      alert("Su password es: " + JRespuesta.body.password);
   } else {
      alert("Error en el registro");
   }
};

//petición para envíar información
const sendData = async (body) => {
   return new Promise(async (resolve, reject) => {
      try {
         let res = await fetch("http://localhost:8080/api/registro", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               Authorization: "INTCOMEX",
               "Content-Type": "application/json",
            },
         });
         resolve(res.json());
      } catch (e) {
         reject(e);
      }
   });
};

const validarUser = (value = "") => {
   if (value.slice(0, 3) !== "XMX") return false;
   return true;
};

const checkName = (value = "") => {
   if (value.length < 5) return false;
   if (value.length > 15) return false;
   return true;
};

const checkPosition = (value = "") => {
   if (value.length < 5) return false;
   if (value.length > 10) return false;
   return true;
};

const checkPhone = (value = "") => {
   if (value.slice(0, 3) != "+57") return false;
   if (value.length != 10) return false;
   return true;
};
