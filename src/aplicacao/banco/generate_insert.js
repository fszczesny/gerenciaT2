const yup = require("random-name");

var random = require("random-name");

for (let i = 0; i < 100000; i = i + 1) {
  console.log(
    `INSERT INTO banco_teste_gerencia_tb3.usuarios (nome) VALUES ("${random()}");`
  );
}
