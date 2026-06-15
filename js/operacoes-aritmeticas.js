function somarImagens() {
  if (!imagensTemMesmoTamanho()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel1 = imagem1.matriz[y][x];
      const pixel2 = imagem2.matriz[y][x];

      linha.push({
        r: limitarValor(pixel1.r + pixel2.r),
        g: limitarValor(pixel1.g + pixel2.g),
        b: limitarValor(pixel1.b + pixel2.b),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function somarConstanteImagem() {
  const valorConstante = lerNumeroDoInput("valorSomaConstante");
  if (valorConstante === null || !imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(pixel.r + valorConstante),
        g: limitarValor(pixel.g + valorConstante),
        b: limitarValor(pixel.b + valorConstante),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function subtrairImagens() {
  if (!imagensTemMesmoTamanho()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel1 = imagem1.matriz[y][x];
      const pixel2 = imagem2.matriz[y][x];

      linha.push({
        r: limitarValor(pixel1.r - pixel2.r),
        g: limitarValor(pixel1.g - pixel2.g),
        b: limitarValor(pixel1.b - pixel2.b),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function subtrairConstanteImagem() {
  const valorConstante = lerNumeroDoInput("valorSubtracaoConstante");
  if (valorConstante === null || !imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(pixel.r - valorConstante),
        g: limitarValor(pixel.g - valorConstante),
        b: limitarValor(pixel.b - valorConstante),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function multiplicarConstanteImagem() {
  const valorConstante = lerNumeroDoInput("valorMultiplicacaoConstante");
  if (valorConstante === null || !imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(pixel.r * valorConstante),
        g: limitarValor(pixel.g * valorConstante),
        b: limitarValor(pixel.b * valorConstante),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function dividirConstanteImagem() {
  const valorConstante = lerNumeroDoInput("valorDivisaoConstante");
  if (valorConstante === null || !imagem1FoiCarregada()) return;

  if (valorConstante === 0) {
    alert("Impossivel dividir por zero");
    return;
  }

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(pixel.r / valorConstante),
        g: limitarValor(pixel.g / valorConstante),
        b: limitarValor(pixel.b / valorConstante),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}
