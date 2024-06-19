const calcularBtn = document.getElementById("calcular");
const borrarBtn = document.getElementById("borrar");
const container = document.querySelector(".container");
const calculadora = document.querySelector(".calculadora");
const pantalla2 = document.querySelector(".pantalla2");
const pantalla4 = document.querySelector(".pantalla4");
const pantalla6 = document.querySelector(".pantalla6");
const totalMbps = document.querySelector(".total-mbps");
const guarda = document.getElementById("guarda");
const seg1 = document.getElementById("seg1");
const seg2 = document.getElementById("seg2");
const seg3 = document.getElementById("seg3");
const cd_conv1 = document.getElementById("cd_conv1");
const cd_conv2 = document.getElementById("cd_conv2");
const cd_conv3 = document.getElementById("cd_conv3");
const mod1 = document.getElementById("mod1");
const mod2 = document.getElementById("mod2");
const mod3 = document.getElementById("mod3");

// Evento para el botón "Calcular"
calcularBtn.addEventListener("click", () => {
    if (validarCampos()) {
        calcular();
    } else {
        mostrarAlerta("Rellena todos los campos.");
    }
});

// Evento para el botón "Borrar"
borrarBtn.addEventListener("click", () => {
    resetear();
});

function calcular() {
    const guardav = parseFloat(guarda.value);
    const segav = parseFloat(seg1.value);
    const segbv = parseFloat(seg2.value);
    const segcv = parseFloat(seg3.value);
    const cdav = parseFloat(cd_conv1.value);
    const cdbv = parseFloat(cd_conv2.value);
    const cdcv = parseFloat(cd_conv3.value);
    const mdav = parseFloat(mod1.value);
    const mdbv = parseFloat(mod2.value);
    const mdcv = parseFloat(mod3.value);

    const tasaMbpsa = calcularTasaMbps(segav, cdav, mdav, guardav);
    const tasaMbpsb = calcularTasaMbps(segbv, cdbv, mdbv, guardav);
    const tasaMbpsc = calcularTasaMbps(segcv, cdcv, mdcv, guardav);

    const totalMbpsValue = tasaMbpsa + tasaMbpsb + tasaMbpsc;

    pantalla2.textContent = tasaMbpsa.toFixed(3);
    pantalla4.textContent = tasaMbpsb.toFixed(3);
    pantalla6.textContent = tasaMbpsc.toFixed(3);
    totalMbps.textContent = totalMbpsValue.toFixed(3);
}

function resetear() {
    // Restablecer los valores de los inputs y selectores
    guarda.value = "0";
    seg1.value = "0";
    seg2.value = "0";
    seg3.value = "0";
    cd_conv1.value = "0";
    cd_conv2.value = "0";
    cd_conv3.value = "0";
    mod1.value = "0";
    mod2.value = "0";
    mod3.value = "0";
    totalMbps.textContent = "0";

    // Animación de bola de papel arrugado y nueva pantalla
    container.classList.add("animacion-reset");

    setTimeout(() => {
        container.classList.remove("animacion-reset");
    }, 1000); // Ajusta el tiempo según la duración de la animación CSS
}

function calcularTasaMbps(seg, cdConv, mod, guarda) {
    if (seg === 0 || cdConv === 0 || mod === 0 || guarda === 0) {
        return 0;
    } else {
        return (
            (Number(seg) *
                ((8 * 0.922 * Number(cdConv) * Math.log2(Number(mod))) /
                    (21 * (1 + Number(guarda)))))
        );
    }
}

function validarCampos() {
    return (
        seg1.value !== "" &&
        seg2.value !== "" &&
        seg3.value !== "" &&
        cd_conv1.value !== "0" &&
        cd_conv2.value !== "0" &&
        cd_conv3.value !== "0" &&
        mod1.value !== "0" &&
        mod2.value !== "0" &&
        mod3.value !== "0" &&
        guarda.value !== "0"
    );
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement("div");
    alerta.classList.add("nueva-pantalla");
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 2000); // Mostrar la alerta durante 2 segundos
}
