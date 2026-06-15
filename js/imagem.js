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

      linha.push({
        r: pixels[indice],
        g: pixels[indice + 1],
        b: pixels[indice + 2],
        a: pixels[indice + 3],
      });
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
