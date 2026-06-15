function imagensForamCarregadas() {
  if (!imagem1 || !imagem2) {
    alert("Carregue as duas imagens primeiro.");
    return false;
  }

  return true;
}

function imagem1FoiCarregada() {
  if (!imagem1) {
    alert("Carregue a imagem 1");
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

function lerNumeroDoInput(idInput) {
  const valor = Number(document.getElementById(idInput).value);

  if (isNaN(valor)) {
    alert("Digite um valor valido");
    return null;
  }

  return valor;
}
