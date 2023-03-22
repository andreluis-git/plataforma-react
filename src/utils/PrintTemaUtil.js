const print = (tema) => {
  let a = window.open("", "", "");
  a.document.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Plataforma - Tema</title>
        <style>
          body {
            padding: 25px;
          }
          .cabecalho {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .borda-pagina {
            border: solid;
            border-radius: 10px;
            padding: 20px;
            border-width: 1px;
          }
          .titulo {
            font-weight: bold;
            font-size: 30px;
            margin-bottom: 10px;
          }
          .subtitulo {
            font-weight: bold;
            font-size: 20px;
            color: grey;
          }
          .data {
            font-size: 15px;
          }
          .descricao {
            font-size: 15px;
          }
        </style>
      </head>
      <body>
        <div class="borda-pagina">
          <div class="cabecalho">
            <span class="titulo">${tema.titulo}</span>
            <span class="data">${tema.dataCriacao}</span>
          </div>
          <span class="subtitulo">${tema.criadorTema.cursoAluno.nome}</span>
          <hr style="margin: 10px 0px" />
          <div style="text-align: justify;">
          <span class="descricao">${tema.descricao}</span>
          </div>
        </div>
      </body>
    </html>
    `);
  a.document.close();
  a.print();
  a.close();
};

const PrintTema = {
  print,
};

export default PrintTema;
