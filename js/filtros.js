function copiarMatrizOriginal() {
  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      linha.push({
        r: pixel.r,
        g: pixel.g,
        b: pixel.b,
        a: pixel.a,
      });
    }

    matrizResultado.push(linha);
  }

  return matrizResultado;
}

function filtroMaxImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      let maiorR = 0;
      let maiorG = 0;
      let maiorB = 0;

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];

          if (pixel.r > maiorR) maiorR = pixel.r;
          if (pixel.g > maiorG) maiorG = pixel.g;
          if (pixel.b > maiorB) maiorB = pixel.b;
        }
      }

      matrizResultado[y][x] = {
        r: maiorR,
        g: maiorG,
        b: maiorB,
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroMinImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      let menorR = 255;
      let menorG = 255;
      let menorB = 255;

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];

          if (pixel.r < menorR) menorR = pixel.r;
          if (pixel.g < menorG) menorG = pixel.g;
          if (pixel.b < menorB) menorB = pixel.b;
        }
      }

      matrizResultado[y][x] = {
        r: menorR,
        g: menorG,
        b: menorB,
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroMeanImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      let somaR = 0;
      let somaG = 0;
      let somaB = 0;

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];

          somaR += pixel.r;
          somaG += pixel.g;
          somaB += pixel.b;
        }
      }

      matrizResultado[y][x] = {
        r: limitarValor(somaR / 9),
        g: limitarValor(somaG / 9),
        b: limitarValor(somaB / 9),
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function calcularMediana(valores) {
  const ordenados = valores.slice().sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);

  return ordenados[meio];
}

function filtroMedianaImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      const valoresR = [];
      const valoresG = [];
      const valoresB = [];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];

          valoresR.push(pixel.r);
          valoresG.push(pixel.g);
          valoresB.push(pixel.b);
        }
      }

      matrizResultado[y][x] = {
        r: calcularMediana(valoresR),
        g: calcularMediana(valoresG),
        b: calcularMediana(valoresB),
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroOrdemImagem() {
  const ordem = lerNumeroDoInput("valorOrdemFiltro");
  if (ordem === null) return;

  if (ordem < 1 || ordem > 9) {
    alert("A ordem deve estar entre 1 e 9.");
    return;
  }

  if (!imagem1FoiCarregada()) return;

  const indiceOrdem = ordem - 1;
  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      const valoresR = [];
      const valoresG = [];
      const valoresB = [];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];

          valoresR.push(pixel.r);
          valoresG.push(pixel.g);
          valoresB.push(pixel.b);
        }
      }

      valoresR.sort((a, b) => a - b);
      valoresG.sort((a, b) => a - b);
      valoresB.sort((a, b) => a - b);

      matrizResultado[y][x] = {
        r: valoresR[indiceOrdem],
        g: valoresG[indiceOrdem],
        b: valoresB[indiceOrdem],
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroSuavizacaoConservativaImagem() {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      const pixelAtual = imagem1.matriz[y][x];
      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];
      const valoresR = [];
      const valoresG = [];
      const valoresB = [];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          if (linha === 1 && coluna === 1) continue;

          const pixel = mask[linha][coluna];

          valoresR.push(pixel.r);
          valoresG.push(pixel.g);
          valoresB.push(pixel.b);
        }
      }

      const menorR = Math.min(...valoresR);
      const maiorR = Math.max(...valoresR);
      const menorG = Math.min(...valoresG);
      const maiorG = Math.max(...valoresG);
      const menorB = Math.min(...valoresB);
      const maiorB = Math.max(...valoresB);

      matrizResultado[y][x] = {
        r: Math.min(Math.max(pixelAtual.r, menorR), maiorR),
        g: Math.min(Math.max(pixelAtual.g, menorG), maiorG),
        b: Math.min(Math.max(pixelAtual.b, menorB), maiorB),
        a: pixelAtual.a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function criarKernelGaussiano(tamanho, sigma) {
  const raio = Math.floor(tamanho / 2);
  const kernel = [];
  let soma = 0;

  for (let y = -raio; y <= raio; y++) {
    const linha = [];

    for (let x = -raio; x <= raio; x++) {
      const valor =
        Math.exp(-(x * x + y * y) / (2 * sigma * sigma)) /
        (2 * Math.PI * sigma * sigma);

      linha.push(valor);
      soma += valor;
    }

    kernel.push(linha);
  }

  for (let y = 0; y < tamanho; y++) {
    for (let x = 0; x < tamanho; x++) {
      kernel[y][x] /= soma;
    }
  }

  return kernel;
}

function aplicarConvolucao(kernel) {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      let r = 0;
      let g = 0;
      let b = 0;

      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];
          const peso = kernel[linha][coluna];

          r += pixel.r * peso;
          g += pixel.g * peso;
          b += pixel.b * peso;
        }
      }

      matrizResultado[y][x] = {
        r: limitarValor(r),
        g: limitarValor(g),
        b: limitarValor(b),
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroGaussianoImagem() {
  const sigma = lerNumeroDoInput("valorSigmaGaussiano");
  if (sigma === null) return;

  if (sigma <= 0) {
    alert("O sigma deve ser maior que zero.");
    return;
  }

  aplicarConvolucao(criarKernelGaussiano(3, sigma));
}

function aplicarDetectorBordas(kernelX, kernelY) {
  if (!imagem1FoiCarregada()) return;

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      let gradienteX = 0;
      let gradienteY = 0;

      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];
          const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

          gradienteX += cinza * kernelX[linha][coluna];
          gradienteY += cinza * kernelY[linha][coluna];
        }
      }

      const magnitude = Math.sqrt(gradienteX * gradienteX + gradienteY * gradienteY);
      const valor = limitarValor(magnitude);

      matrizResultado[y][x] = {
        r: valor,
        g: valor,
        b: valor,
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}

function filtroPrewittImagem() {
  aplicarDetectorBordas(
    [
      [-1, 0, 1],
      [-1, 0, 1],
      [-1, 0, 1],
    ],
    [
      [-1, -1, -1],
      [0, 0, 0],
      [1, 1, 1],
    ],
  );
}

function filtroSobelImagem() {
  aplicarDetectorBordas(
    [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
  );
}

function filtroLaplacianoImagem() {
  if (!imagem1FoiCarregada()) return;

  const kernel = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
  ];
  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = copiarMatrizOriginal();

  for (let y = 1; y < altura - 1; y++) {
    for (let x = 1; x < largura - 1; x++) {
      let valor = 0;

      const mask = [
        [imagem1.matriz[y - 1][x - 1], imagem1.matriz[y - 1][x], imagem1.matriz[y - 1][x + 1]],
        [imagem1.matriz[y][x - 1], imagem1.matriz[y][x], imagem1.matriz[y][x + 1]],
        [imagem1.matriz[y + 1][x - 1], imagem1.matriz[y + 1][x], imagem1.matriz[y + 1][x + 1]],
      ];

      for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
          const pixel = mask[linha][coluna];
          const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

          valor += cinza * kernel[linha][coluna];
        }
      }

      const cinza = limitarValor(Math.abs(valor));

      matrizResultado[y][x] = {
        r: cinza,
        g: cinza,
        b: cinza,
        a: imagem1.matriz[y][x].a,
      };
    }
  }

  exibirResultado(matrizResultado, largura, altura);
}
