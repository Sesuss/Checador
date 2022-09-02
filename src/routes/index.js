const express = require("express")
const router = express.Router()
const pool = require("../database")
const pdfc =require("../routes/pdf")
var moment = require('moment');
const {isLoggedIn, isAdmin} = require("../lib/auth");
const { LastMonthInstance } = require("twilio/lib/rest/api/v2010/account/usage/record/lastMonth");



const log = console.log

//Principal
router.get("/",  (req, res) => { 
    res.redirect("/checador")  
})




router.get("/checador", async (req, res) => {
    res.render("layouts/abc")
})














/*
router.get("/ferreteria/devoluciones", isLoggedIn, async (req, res) => {
    let id = await pool.query("SELECT * FROM tblventas WHERE VentaCerrada = 1 order by `IdVenta` desc LIMIT 1;")
if(id[0] != undefined){

    id=id[0].IdVenta
}else{
    id=0
}
    res.render("layouts/devoluciones",{id})
})


router.get("/devolucion:id/", isLoggedIn, async (req, res) => {
    const { id } = req.params
    let user = req.user
    let ventas = await pool.query("SELECT * FROM tblventas WHERE IdVenta = ?",[id])
    if(ventas[0].VentaCerrada == 1){
    let productos = await pool.query("SELECT * FROM tbldetalleventa WHERE IdVenta = ?",[id])
    for (let index = 0; index < productos.length; index++) {
       await pool.query("UPDATE tblproductos SET Existencias = Existencias + ? WHERE IdProducto = ?",[productos[index].Cantidad,productos[index].IdProducto])
        
    }
    await pool.query("UPDATE tblventas SET VentaCerrada = 2 WHERE IdVenta = ?",[id])
    await pool.query("INSERT INTO tbldevoluciones SET Vendedor = ?, IdVenta = ?",[user.Nombre,id])
    res.redirect("/ferreteria/punto")
}else{
    res.redirect("/ferreteria/reportes")
    }

})


router.get("/ferreteria/punto_de_venta:id/", isLoggedIn, async (req, res) => {
    let {id} = req.params
    let venta = await pool.query("SELECT * FROM tblventas WHERE IdVenta = ?",[id])
    if(venta[0].VentaCerrada == 1){
        res.redirect("/ferreteria/punto")
    }else{

        let producto = await pool.query("SELECT * FROM tblproductos WHERE Existencias > 0")
        let productos = await pool.query("SELECT tbldetalleventa.*,tblproductos.Descripcion FROM tbldetalleventa,tblproductos WHERE tbldetalleventa.IdVenta = ? AND tblproductos.IdProducto = tbldetalleventa.IdProducto",[id])
        
        let Total=0
        for (let index = 0; index < productos.length; index++) {
            Total+=productos[index].Importe
            productos[index].Importe=productos[index].Importe.toFixed(2)
            productos[index].Cantidad=productos[index].Cantidad.toFixed(2)
            
        }
        Total=Total.toFixed(2)
        res.render("layouts/punto_venta_v",{producto,productos,id,Total})
    }
        
    })
    
router.get("/eliminar:id/producto:idP/", isLoggedIn, async (req, res) => {
    let {id,idP} = req.params
    let producto = await pool.query("SELECT * FROM tbldetalleventa WHERE IdVenta = ? AND IdProducto = ? ",[id,idP])
    await pool.query("UPDATE tblproductos SET Existencias = Existencias+? WHERE IdProducto = ? ",[producto[0].Cantidad,idP])
    await pool.query("DELETE FROM tbldetalleventa WHERE IdVenta = ? AND IdProducto = ? ",[id,idP])
    res.redirect("/ferreteria/punto_de_venta"+id)
    
})

router.post("/agregar_carrito", isLoggedIn, async (req, res) => {
    const {IdProducto, Cantidad, Precio} = req.body
    let Importe=Cantidad*Precio
    let carrito = await pool.query("INSERT INTO tblventas (`IdVendedor`, `IdCliente`, `Total`) VALUES (NULL, NULL, NULL)")
    await pool.query("INSERT INTO tbldetalleventa SET IdVenta = ?, IdProducto = ?, Cantidad = ?, Precio = ?, Importe = ?",[carrito.insertId,IdProducto, Cantidad, Precio,Importe])
    await pool.query("UPDATE tblproductos SET Existencias = Existencias-? WHERE IdProducto = ?",[Cantidad,IdProducto])
    res.redirect("/ferreteria/punto_de_venta"+carrito.insertId)
    
})
*/
module.exports = router