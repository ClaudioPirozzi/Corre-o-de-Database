// Ler database json

const fs = require("fs");
const path = require("path");

function lerArquivo(arquivo) {
  const jsonData = fs.readFileSync(
    path.join(process.cwd(), "broken-database.json")
  );
  return jsonData;
}
const arquivoLido = lerArquivo();
const data = JSON.parse(arquivoLido);

//Arrumar caracteres

const caracterCorrigido = data.map(organizarCaracteres);

function organizarCaracteres(entrada) {
  const o = entrada.name.replaceAll("ø", "o");
  const a = o.replaceAll("æ", "a");
  const c = a.replaceAll("¢", "c");
  const b = c.replaceAll("ß", "b");
  return { ...entrada, name: b };
}

// Arrumar tipo de dado do preço

function corrigirPreco(entrada) {
  if (typeof entrada.price === "string") {
    entrada.price = Number(entrada.price);
  }
  return entrada;
}

const precoCorrigido = caracterCorrigido.map(corrigirPreco);

// Arrumar quantidades

function corrigirQuantidade(entrada) {
  if (!entrada.quantity) {
    entrada.quantity = 0;
  }
  return entrada;
}

const quantidadeCorrigida = precoCorrigido.map(corrigirQuantidade);

//Exportar arquivo JSON
function exportarArquivo() {
  const x = JSON.stringify(precoCorrigido);
  fs.writeFileSync("database_corrigido.json", x);
}

exportarArquivo();
