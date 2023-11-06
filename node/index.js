const express = require('express')
const mysql = require('mysql')
const randomName = require('random-name')
const name = randomName.first()
let people = [] 

const app = express()
const port = 3003
const host = '0.0.0.0'

const config = {
    host: 'mysql-db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)

const insertSql = `INSERT INTO people(name) values('${name}')`
connection.query(insertSql)

const selectSql = "SELECT name FROM people"
connection.query(selectSql, (err, results) => {
    if (err) {
    console.error('Erro ao executar a consulta: ' + err.message);
    return;
    }

    people = [...results.map(pessoa => pessoa.name)]
});

connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão: ' + err.message);
      return;
    }
    console.log('Conexão fechada com o banco de dados MySQL');
});

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>\n <h2>Lista de nomes cadastrados: \n</h2><ul>' + people.map(pessoa => '<li>' + pessoa + '</li>').join('') + '</ul>') 
})

app.listen(port, ()=> {
    console.log(`Servidor Node.js está rodando em http://${host}:${port}`)
})