//Banco de dados simples SQLite
import sqlite3 from "sqlite3";
// Ferramentas do banco de dados
import { open } from "sqlite";

//Função assincrona de manipular o banco de dados
async function criarEPopularTabelaUsuarios(nome, sobrenome) {
    // Criação do Objeto BD
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database,
    });
    
    // Criar o banco caso não exista
    db.run(
      `CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT)`
    );

    // Inserir dados no banco
    db.run(`INSERT INTO usuarios (nome, sobrenome) VALUES (?,?)`, [
      nome,
      sobrenome,
    ]);

}

// Executa a função
criarEPopularTabelaUsuarios("Marcelo","Silva");

