// criando e ativando o express
const express = require("express");
const app = express();
// cross origin resource sharing
const cors = require("cors");
// with this pool, we can run queries with postgres
const pool = require("./db");
// definicao de porta
const PORT = 3001;

// middlewares
app.use(cors());
app.use(express.json());

// monitorar porta e msg de conexao 
app.listen(PORT, () => {
    console.log("Servidor iniciado porta: " + PORT);

});


// ROUTES 


// index


// create register

app.post("/api/v1/register", async (req,res) => {
    try {
        const {cod_prod, prod_name, description, price} = req.body;
        const results = await pool.query(
            "INSERT INTO products (cod_prod, prod_name, description, price) VALUES ($1, $2, $3, $4) returning *", [ cod_prod, prod_name, description, price]
        );
        //res.send(req.body);
        console.log(results.rows);
        //res.json({
            
        //})
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});

// read all registers

    app.get("/api/v1/regs", async (req,res) => {
        try {
            const allRegs = await pool.query("SELECT * FROM products");
            //console.log(allRegs);
            res.send(allRegs);
        } catch (err) {
            console.error(err.message)
        }

    });


// read one register

app.get("/api/v1/regs/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const oneReg = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send(oneReg);
    } catch (err) {
        console.error(err.message)
    }

});

// update one register

app.put("/api/v1/regs/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {cod_prod, prod_name, description, price } = req.body;
        console.log(req.body)
        const oneReg = await pool.query("UPDATE products SET cod_prod=$1, prod_name=$2, description = $3, price=$4 WHERE id = $5", [cod_prod, prod_name, description, price, id]);
        console.log(oneReg);
        res.send("Entry was updated!");
        

       /*
        const { id } = req.params;
        console.log(id)
        const {cod_prod, prod_name, description, price} = req.body;
        const renew = await pool.query(
            "UPDATE products SET cod_prod=$1, prod_name=$2, description=$3, price=$4 WHERE id = $5", [cod_prod, prod_name, description, price, id]
        );
        //res.send(req.body);
        //console.log(renew.rows);

        res.send("Entry was updated!")
        */







    } catch (err) {
        console.error(err.message)
    }

});

// delete a register

app.delete("/api/v1/regs/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReg= await pool.query("DELETE FROM products WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send("Entry was deleted!");
    } catch (err) {
        console.error(err.message)
    }

});