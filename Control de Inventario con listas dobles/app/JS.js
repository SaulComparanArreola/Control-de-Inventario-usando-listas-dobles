let Producto = function (nombre, Id, cantidad, precio) {
  this.nombre = nombre;
  this.id = Id;
  this.cantidad = cantidad;
  this.precio = precio;
  this.siguiente=null;
  this.inscribir = function () {
    return "Producto agregado"
  }
  this.info = function () {
    return this.nombre + "\n ID del producto:" + this.id
  }
  this.infoHtml = function () {

    return "<div><p>Nombre: <br>" + this.nombre +
      "<br>ID del producto <br>" + this.id +
      " <br>Cantidad <br>" + this.cantidad + "<br>" +
      "Precio <br>" + this.precio + "</p></div>"
  }
}

let Grupo = function () { //edArrayGrupo
  this.inicio=null;
  
    this.agregar=function(nuevo)
    {
      if (this.inicio==null)
        this.inicio=nuevo;
      else
      {
        if(this.inicio.id<nuevo.id && this.inicio.siguiente==null)
        {
          this.inicio.siguiente=nuevo;
          nuevo.anterior=this.inicio;

        }
        else
        {
          if(this.inicio.id>nuevo.id)
          {
            this.inicio.anterior=nuevo;
            nuevo.siguiente=this.inicio;
            this.inicio=nuevo;
            return true;
          }
          else
          {
            let t=this.inicio;
            while(t.siguiente!=null)
              if(t.id>nuevo.id)
              {
                nuevo.siguiente=t;
                nuevo.anterior=t.anterior;
                t.anterior.siguiente=nuevo;
                t.anterior=nuevo;
                return true;
              }
              else
              {
                t=t.siguiente;
                if(t.siguiente==null)
                {
                t.siguiente=nuevo;
                nuevo.anterior=t;
                return true;
                }
              }
            }   
        } 
      }
    console.log(nuevo);
    }

    this.buscar=function(id)
    {
      let t=this.inicio;
        while(t!=null && t.id!=id)
        {
	        t=t.siguiente;
        }
          return t;   
    }
    

    this.listar=function()
    {
      let res=""; 
      let t=this.inicio;
      while(t!=null)
      {
        res+= t.infoHtml() + "<br>";
        t=t.siguiente;
      }
        return res; 
    }

    this.eliminar = function (id)
    { 
      let vacio="";
      if(vacio==id)
      {
        return false;
      }
      else
      {
        if (this.inicio.id==id)
        {
          this.inicio=this.inicio.siguiente;
          this.inicio.anterior=null;
        }
        else
        {
              let t=this.inicio;
              while(t.siguiente!=null)
                if (t.id==id)
                {
                  t.siguiente.anterior=t.anterior;
                  t.anterior.siguiente=t.siguiente;
                  return true;
                }
                else
                  {
                    t=t.siguiente;
                    if(t.siguiente==null)
                    {
                      t=t.anterior;
                      t.siguiente=null;
                      return true;
                    }
                  }
        return false;
        }
      }
    }

}

let grupo2c = new Grupo();

let btnCrear = document.getElementById('btnCrear');
btnCrear.addEventListener('click', () => {
  let nom, id, pre, cant;
  nom = document.getElementById('txtNombre').value;
  id = document.getElementById('txtId').value;
  pre = document.getElementById('txtCantidad').value;
  cant = document.getElementById('txtPrecio').value;
  let producto = new Producto(nom, id, pre, cant);
  grupo2c.agregar(producto);
  console.log('Se agrego ' + producto.info());

});

let btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
  let id = document.getElementById('txtId').value;
  let buscado = grupo2c.buscar(id); //alumno
  let res = document.getElementById('resultados');
  if (buscado == null)
    res.innerHTML = "<h3>No se encontro en la busqueda</h3>"
  else {
    res.innerHTML = "<h3>Si se encontro</h3>" + buscado.infoHtml();
    document.getElementById('txtId').value = buscado.id;
    document.getElementById('txtCantidad').value = buscado.cantidad;
  }

})


let btnEliminar=document.getElementById("btnEliminar");
  btnEliminar.addEventListener("click", ()=>{
    let id = document.getElementById('txtId').value;
    let res = document.getElementById('resultados');
    let eliminado=grupo2c.eliminar(id);
    if(eliminado==false)
      res.innerHTML= "<h3>No se elimino ningun producto</h3>"
    else
      res.innerHTML= "<h3>Se ha eliminado el producto</h3>"
    

  })


let btnListar = document.getElementById('btnListar');
btnListar.addEventListener('click', () => {
  let res = document.getElementById('resultados');
  res.innerHTML = "<h1>LISTADO</h1>" + grupo2c.listar();
})