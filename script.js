const inputImagem1 = document.getElementById("uploadImagem1");
const inputImagem2 = document.getElementById("uploadImagem2");

const canvasImagem1 = document.getElementById("canvasOriginal1");
const ctxImagem1 = canvasImagem1.getContext("2d");

const canvasImagem2 = document.getElementById("canvasOriginal2");
const ctxImagem2 = canvasImagem2.getContext("2d");

const canvasResultado = document.getElementById("canvasResultado");
const ctxResultado = canvasResultado.getContext("2d");

let imagem1 = null;
let imagem2 = null;

inputImagem1.addEventListener("change", async function (evento) {
  const arquivo = evento.target.files[0];

  try {
    imagem1 = await lerImagem(arquivo, canvasImagem1, ctxImagem1);
    console.log("Imagem 1 carregada:", imagem1);
  } catch (erro) {
    alert(erro);
  }
});

inputImagem2.addEventListener("change", async function (evento) {
  const arquivo = evento.target.files[0];

  try {
    imagem2 = await lerImagem(arquivo, canvasImagem2, ctxImagem2);
    console.log("Imagem 2 carregada:", imagem2);
  } catch (erro) {
    alert(erro);
  }
});

function lerImagem(arquivo, canvas, ctx) {
  return new Promise(function (resolve, reject) {
    if (!arquivo) {
      reject("Nenhum arquivo selecionado.");
      return;
    }

    const formatosPermitidos = ["image/bmp", "image/jpeg", "image/png"];

    if (!formatosPermitidos.includes(arquivo.type)) {
      reject("Formato inválido. Use uma imagem BMP, JPG ou PNG.");
      return;
    }

    const leitor = new FileReader();
    const imagem = new Image();

    leitor.onload = function (evento) {
      imagem.onload = function () {
        const largura = imagem.width;
        const altura = imagem.height;

        canvas.width = largura;
        canvas.height = altura;

        ctx.clearRect(0, 0, largura, altura);
        ctx.drawImage(imagem, 0, 0);

        const imageData = ctx.getImageData(0, 0, largura, altura);

        const matriz = converterImageDataParaMatriz(imageData);

        resolve({
          nome: arquivo.name,
          tipo: arquivo.type,
          largura: largura,
          altura: altura,
          imageData: imageData,
          matriz: matriz,
        });
      };

      imagem.onerror = function () {
        reject("Erro ao carregar a imagem.");
      };

      imagem.src = evento.target.result;
    };

    leitor.onerror = function () {
      reject("Erro ao ler o arquivo.");
    };

    leitor.readAsDataURL(arquivo);
  });
}

function converterImageDataParaMatriz(imageData) {
  const largura = imageData.width;
  const altura = imageData.height;
  const pixels = imageData.data;

  const matriz = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const indice = (y * largura + x) * 4;

      const pixel = {
        r: pixels[indice],
        g: pixels[indice + 1],
        b: pixels[indice + 2],
        a: pixels[indice + 3],
      };

      linha.push(pixel);
    }

    matriz.push(linha);
  }

  return matriz;
}

function converterMatrizParaImageData(matriz, largura, altura) {
  const imageData = ctxResultado.createImageData(largura, altura);
  const pixels = imageData.data;

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const indice = (y * largura + x) * 4;
      const pixel = matriz[y][x];

      pixels[indice] = pixel.r;
      pixels[indice + 1] = pixel.g;
      pixels[indice + 2] = pixel.b;
      pixels[indice + 3] = pixel.a;
    }
  }

  return imageData;
}

function exibirResultado(matriz, largura, altura) {
  canvasResultado.width = largura;
  canvasResultado.height = altura;

  const imageDataResultado = converterMatrizParaImageData(
    matriz,
    largura,
    altura,
  );

  ctxResultado.putImageData(imageDataResultado, 0, 0);
}

function imagensForamCarregadas() {
  if (!imagem1 || !imagem2) {
    alert("Carregue as duas imagens primeiro.");
    return false;
  }

  return true;
}

function imagensTemMesmoTamanho() {
  if (!imagensForamCarregadas()) {
    return false;
  }

  if (
    imagem1.largura !== imagem2.largura ||
    imagem1.altura !== imagem2.altura
  ) {
    alert("As duas imagens precisam ter a mesma largura e altura.");
    return false;
  }

  return true;
}

function limitarValor(valor) {
  if (valor > 255) return 255;
  if (valor < 0) return 0;
  return Math.round(valor);
}

// ========================================
// Operaçöes com imagens
// ========================================

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
  const valorConstante = Number(
    document.getElementById("valorSomaConstante").value,
  );

  if (isNaN(valorConstante)) {
    alert("Digite um valor valido");
    return;
  }

  if (!imagem1) {
    alert("Carregue a imagem 1");
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
  const valorConstante = Number(
    document.getElementById("valorSubtracaoConstante").value,
  );
  if (isNaN(valorConstante)) {
    alert("Digite um valor valido");
    return;
  }

  if (!imagem1) {
    alert("Carregue a imagem 1");
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
  const valorConstante = Number(
    document.getElementById("valorMultiplicacaoConstante").value,
  );
  if (isNaN(valorConstante)) {
    alert("Digite um valor valido");
    return;
  }
  if (!imagem1) {
    alert("Carregue a imagem 1");
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
  const valorConstante = Number(
    document.getElementById("valorDivisaoConstante").value,
  );
  if (isNaN(valorConstante)) {
    alert("Digite um valor valido");
    return;
  }

  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }

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

function salvarImagemResultado() {
  if (canvasResultado.width === 0 || canvasResultado.height === 0) {
    alert("Nenhuma imagem para salvar.");
    return;
  }

  const link = document.createElement("a");

  link.download = "image.png";
  link.href = canvasResultado.toDataURL("image/png");

  link.click();
}

function converterParaEscalaDeCinza() {
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }

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
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }
  const largura = imagem1.largura;
  const altura = imagem1.altura;

  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const invertido = largura - 1 - x;
      const pixel = imagem1.matriz[y][invertido];

      linha.push(pixel);
    }

    matrizResultado.push(linha);
  }
  exibirResultado(matrizResultado, largura, altura);
}

function inverterImagemCimaBaixo() {
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }
  const largura = imagem1.largura;
  const altura = imagem1.altura;

  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];

    for (let x = 0; x < largura; x++) {
      const invertido = altura - 1 - y;
      const pixel = imagem1.matriz[invertido][x];

      linha.push(pixel);
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

  const c = Number(document.getElementById("valorBlending").value);

  if (isNaN(c)) {
    alert("Digite um valor valido");
    return;
  }

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

      const blendR = c * pixel1.r + (1 - c) * pixel2.r;
      const blendG = c * pixel1.g + (1 - c) * pixel2.g;
      const blendB = c * pixel1.b + (1 - c) * pixel2.b;

      linha.push({
        r: limitarValor(blendR),
        g: limitarValor(blendG),
        b: limitarValor(blendB),
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

      const mediaR = (pixel1.r + pixel2.r) / 2;
      const mediaG = (pixel1.g + pixel2.g) / 2;
      const mediaB = (pixel1.b + pixel2.b) / 2;

      linha.push({
        r: limitarValor(mediaR),
        g: limitarValor(mediaG),
        b: limitarValor(mediaB),
        a: Math.max(pixel1.a, pixel2.a),
      });
    }
    matrizResultado.push(linha);
  }
  exibirResultado(matrizResultado, largura, altura);
}

function operacaoNotImagem() {
  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];
    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      const notR = 255 - pixel.r;
      const notG = 255 - pixel.g;
      const notB = 255 - pixel.b;

      linha.push({
        r: limitarValor(notR),
        g: limitarValor(notG),
        b: limitarValor(notB),
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
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];
    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      const threshold = 128;

      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

      const valor = cinza >= threshold ? 255 : 0;

      linha.push({
        r: valor,
        g: valor,
        b: valor,
        a: pixel.a
      })
    }
    matrizResultado.push(linha);
  }
  exibirResultado(matrizResultado, largura, altura);
}

function negativoImagem() {
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }

  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  for (let y = 0; y < altura; y++) {
    const linha = [];
    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      const negR = 255 - pixel.r;
      const negG = 255 - pixel.g;
      const negB = 255 - pixel.b;

      linha.push({
        r: limitarValor(negR),
        g: limitarValor(negG),
        b: limitarValor(negB),
        a: pixel.a,
      });
    }
    matrizResultado.push(linha);
  }
  exibirResultado(matrizResultado, largura, altura);

}


function normalizarHistogramaImagem() {
  if (!imagem1) {
    alert("Carregue a imagem 1");
    return;
  }
  const largura = imagem1.largura;
  const altura = imagem1.altura;
  const matrizResultado = [];

  const histograma = new Array(256).fill(0);

  //calcular o histograma da imagem
  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const pixel = imagem1.matriz[y][x];

      const cinza = Math.round((pixel.r + pixel.g + pixel.b) / 3);

      histograma[cinza]++;
    }
  }

  //calcular o CFD
  const cfd = new Array(256).fill(0);

  cfd[0] = histograma[0];

  for (let i = 1; i < 256; i++) {
    cfd[i] = cfd[i - 1] + histograma[i];
  }

  //calcular o CFD minimo
  let cfdMin = 0;

  for (let i = 0; i < 256; i++) {
    if (cfd[i] > 0) {
      cfdMin = cfd[i];
      break;
    }
  }

  const mapa = new Array(256);
  const totalPixels = largura * altura;

  for (let i = 0; i < 256; i++) {
    mapa[i] = Math.floor((cfd[i] - cfdMin) / (totalPixels - cfdMin)) * (L - 1);
  }

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