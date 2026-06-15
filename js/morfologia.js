const ELEMENTO_ESTRUTURANTE_3X3 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

function converterParaMatrizBinaria(matriz, largura, altura) {
  const matrizBinaria = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = matriz[y][x];
      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

      linha.push(cinza >= 128 ? 1 : 0);
    }

    matrizBinaria.push(linha);
  }

  return matrizBinaria;
}

function exibirMatrizBinaria(matrizBinaria, largura, altura) {
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const valor = matrizBinaria[y][x] === 1 ? 255 : 0;

      linha.push({
        r: valor,
        g: valor,
        b: valor,
        a: 255,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function copiarMatrizBinaria(matriz, largura, altura) {
  const resultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      linha.push(matriz[y][x]);
    }

    resultado.push(linha);
  }

  return resultado;
}

function dilatarMatrizBinaria(matriz, largura, altura) {
  const resultado = copiarMatrizBinaria(matriz, largura, altura);

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [matriz[y - 1][x - 1], matriz[y - 1][x], matriz[y - 1][x + 1]],
        [matriz[y][x - 1], matriz[y][x], matriz[y][x + 1]],
        [matriz[y + 1][x - 1], matriz[y + 1][x], matriz[y + 1][x + 1]],
      ];
      let valor = 0;

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          if (ELEMENTO_ESTRUTURANTE_3X3[linha][coluna] === 1 && mask[linha][coluna] === 1) {
            valor = 1;
          }
        }
      }

      resultado[y][x] = valor;
    }
  }

  return resultado;
}

function erodirMatrizBinaria(matriz, largura, altura) {
  const resultado = copiarMatrizBinaria(matriz, largura, altura);

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [matriz[y - 1][x - 1], matriz[y - 1][x], matriz[y - 1][x + 1]],
        [matriz[y][x - 1], matriz[y][x], matriz[y][x + 1]],
        [matriz[y + 1][x - 1], matriz[y + 1][x], matriz[y + 1][x + 1]],
      ];
      let valor = 1;

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          if (ELEMENTO_ESTRUTURANTE_3X3[linha][coluna] === 1 && mask[linha][coluna] === 0) {
            valor = 0;
          }
        }
      }

      resultado[y][x] = valor;
    }
  }

  return resultado;
}

function obterImagemBinariaEntrada() {
  if (!imagem1FoiCarregada()) return null;

  return converterParaMatrizBinaria(
    imagem1.matriz,
    imagem1.largura,
    imagem1.altura,
  );
}

function dilatacaoImagem() {
  const matrizBinaria = obterImagemBinariaEntrada();
  if (!matrizBinaria) return;

  const resultado = dilatarMatrizBinaria(
    matrizBinaria,
    imagem1.largura,
    imagem1.altura,
  );

  exibirMatrizBinaria(resultado, imagem1.largura, imagem1.altura);
}

function erosaoImagem() {
  const matrizBinaria = obterImagemBinariaEntrada();
  if (!matrizBinaria) return;

  const resultado = erodirMatrizBinaria(
    matrizBinaria,
    imagem1.largura,
    imagem1.altura,
  );

  exibirMatrizBinaria(resultado, imagem1.largura, imagem1.altura);
}

function aberturaImagem() {
  const matrizBinaria = obterImagemBinariaEntrada();
  if (!matrizBinaria) return;

  const erodida = erodirMatrizBinaria(
    matrizBinaria,
    imagem1.largura,
    imagem1.altura,
  );
  const resultado = dilatarMatrizBinaria(erodida, imagem1.largura, imagem1.altura);

  exibirMatrizBinaria(resultado, imagem1.largura, imagem1.altura);
}

function fechamentoImagem() {
  const matrizBinaria = obterImagemBinariaEntrada();
  if (!matrizBinaria) return;

  const dilatada = dilatarMatrizBinaria(
    matrizBinaria,
    imagem1.largura,
    imagem1.altura,
  );
  const resultado = erodirMatrizBinaria(dilatada, imagem1.largura, imagem1.altura);

  exibirMatrizBinaria(resultado, imagem1.largura, imagem1.altura);
}

function contornoImagem() {
  const matrizBinaria = obterImagemBinariaEntrada();
  if (!matrizBinaria) return;

  const erodida = erodirMatrizBinaria(
    matrizBinaria,
    imagem1.largura,
    imagem1.altura,
  );
  const resultado = [];

  for (let y = 0; y < imagem1.altura; y++) {
    const linha = [];

    for (let x = 0; x < imagem1.largura; x++) {
      linha.push(matrizBinaria[y][x] === 1 && erodida[y][x] === 0 ? 1 : 0);
    }

    resultado.push(linha);
  }

  exibirMatrizBinaria(resultado, imagem1.largura, imagem1.altura);
}
