import { pool } from "../db.js";
import jwt from "jsonwebtoken"

export const createRegistro = async (req, res) => {
    try {
        const { nombre, email, pass } = req.body;
        const [rows] = await pool.query(
          "INSERT INTO users (nombre, email, pass) VALUES (?, ?, ?)",
          [nombre, email, pass]
        );
        //res.status(201).json({ id: rows.insertId, nombre, email, pass });
        const token = jwt.sign({_id: rows.insertId}, 'secretkey') // crear un token
        res.status(200).json({token}) //devolver el token al usuario 
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error al crear Usuario" });
    }
}

export const login = async (req, res) => {
    console.log("Loguendo...")
    try {
        console.log(req.body)
        const { email, password } =  req.body
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND pass = ?", [
          email, password
        ]);

        if (rows.length <= 0) {
          return res.status(404).json({ message: "No existe usuario" });
        }

        if (rows[0].email == email && rows[0].pass == password){
            console.log("Generamos token")
            console.log("Id logueado: "+rows[0].id)
            const token = jwt.sign({_id: rows[0].id}, 'secretkey')
            res.status(200).json({token})                      
        }

    } catch (error) {
        return res.status(500).json({ message: "Error DB Get Usuario Login" });
    }
}

export const getRestringido = async (req, res) => {
    //Validar token en la cabecera -> Authorization = Bearer + token
    return res.json({status: 'Acceso a ruta protegida :D' })
}
