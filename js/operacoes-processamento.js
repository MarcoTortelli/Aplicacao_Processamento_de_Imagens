function converterParaEscalaDeCinza() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];
      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

      linha.push({
        r: cinza,
        g: cinza,
        b: cinza,
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function inverterImagemEsquerdaDireita() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const invertido = largura - 1 - x;
      linha.push(imagem1.matriz[y][invertido]);
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function inverterImagemCimaBaixo() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const invertido = altura - 1 - y;
      linha.push(imagem1.matriz[invertido][x]);
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function diferencaImagens() {
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
        r: Math.abs(pixel1.r - pixel2.r),
        g: Math.abs(pixel1.g - pixel2.g),
        b: Math.abs(pixel1.b - pixel2.b),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function blendingImagens() {
  if (!imagensTemMesmoTamanho()) return;

  const c = lerNumeroDoInput("valorBlending");
  if (c === null) return;

  if (c < 0 || c > 1) {
    alert("O valor de C deve estar entre 0 e 1.");
    return;
  }

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel1 = imagem1.matriz[y][x];
      const pixel2 = imagem2.matriz[y][x];

      linha.push({
        r: limitarValor(c * pixel1.r + (1 - c) * pixel2.r),
        g: limitarValor(c * pixel1.g + (1 - c) * pixel2.g),
        b: limitarValor(c * pixel1.b + (1 - c) * pixel2.b),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function mediaImagens() {
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
        r: limitarValor((pixel1.r + pixel2.r) / 2),
        g: limitarValor((pixel1.g + pixel2.g) / 2),
        b: limitarValor((pixel1.b + pixel2.b) / 2),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function operacaoNotImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(255 - pixel.r),
        g: limitarValor(255 - pixel.g),
        b: limitarValor(255 - pixel.b),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function operacaoAndImagens() {
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
        r: pixel1.r & pixel2.r,
        g: pixel1.g & pixel2.g,
        b: pixel1.b & pixel2.b,
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function operacaoOrImagens() {
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
        r: pixel1.r | pixel2.r,
        g: pixel1.g | pixel2.g,
        b: pixel1.b | pixel2.b,
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function operacaoXorImagens() {
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
        r: pixel1.r ^ pixel2.r,
        g: pixel1.g ^ pixel2.g,
        b: pixel1.b ^ pixel2.b,
        a: Math.max(pixel1.a, pixel2.a),
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function limiarizacaoImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const threshold = 128;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];
      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);
      const valor = cinza >= threshold ? 255 : 0;

      linha.push({
        r: valor,
        g: valor,
        b: valor,
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function negativoImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: limitarValor(255 - pixel.r),
        g: limitarValor(255 - pixel.g),
        b: limitarValor(255 - pixel.b),
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}

function normalizarHistogramaImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const totalPixels = largura * altura;
  const niveis = 256;
  const histograma = new Array(niveis).fill(0);

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];
      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);
      histograma[cinza]++;
    }
  }

  const acumulada = new Array(niveis).fill(0);
  acumulada[0] = histograma[0];

  for (let i = 1; i < niveis; i++) {
    acumulada[i] = acumulada[i - 1] + histograma[i];
  }

  let acumuladaMinima = 0;

  for (let i = 0; i < niveis; i++) {
    if (acumulada[i] > 0) {
      acumuladaMinima = acumulada[i];
      break;
    }
  }

  const mapa = new Array(niveis).fill(0);

  for (let i = 0; i < niveis; i++) {
    if (totalPixels === acumuladaMinima) {
      mapa[i] = i;
    } else {
      mapa[i] = limitarValor(
        ((acumulada[i] - acumuladaMinima) / (totalPixels - acumuladaMinima)) *
          (niveis - 1),
      );
    }
  }

  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];
      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);
      const valor = mapa[cinza];

      linha.push({
        r: valor,
        g: valor,
        b: valor,
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  exibirResultado(matrizResultado, largura, altura);
}
