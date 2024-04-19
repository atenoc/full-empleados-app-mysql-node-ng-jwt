import { pool } from "../db.js";

export const createUser = async (req, res) => {
  try {
    const { nombre, email, pass } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO users (nombre, email, pass) VALUES (?, ?, ?)",
      [nombre, email, pass]
    );
    res.status(201).json({ id: rows.insertId, nombre, email, pass });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear Usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error db Get Users" });
  }
};

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Usuario not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Error db Get Usuario" });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, pass } = req.body;
  
      const [result] = await pool.query(
        "UPDATE users SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), pass = IFNULL(?, pass) WHERE id = ?",
        [nombre, email, pass, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Usuario not found" });
  
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Error DB Update Usuario" });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Usuario not found" });
      }
  
      //res.sendStatus(204);
      //res.sendStatus(200);
      res.json({"status":"Usuario eliminado"});
    } catch (error) {
      return res.status(500).json({ message: "Error DB Delete Usuario" });
    }
  };