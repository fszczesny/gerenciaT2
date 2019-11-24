const mysql = require("mysql");

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const main = async () => {
  while (true) {
    await sleep(1000);
    try {
      var connection = mysql.createConnection({
        host: "aplicacao-banco", // docker-compose magic :) (links tag)
        port: 3306,
        user: "root",
        password: "secret",
        database: "banco_teste_gerencia_tb3"
      });
      connection.connect();
      connection.query("SELECT * FROM usuarios", function(
        error,
        results,
        fields
      ) {
        if (error) {
          console.log("error", error);
        } else {
          console.log("ok", results[0]);
        }
      });
      connection.end();
    } catch (e) {
      console.log("catch", e);
    }
  }
};

main();
