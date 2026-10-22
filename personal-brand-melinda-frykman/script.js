// ==========================================================================
// 1. TEMA-VÄXLARE (LJUST / MÖRKT LÄGE MED LOCALSTORAGE)
// ==========================================================================
const temaknapp = document.querySelector("#tema");

if (temaknapp) {
    temaknapp.hidden = false;

    // Hämta sparat tema eller följ systeminställning
    const sparatTema = localStorage.getItem("mf_tema");
    const foredrarMorkt = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (sparatTema === "morkt" || (!sparatTema && foredrarMorkt)) {
        document.body.classList.add("morkt");
        temaknapp.textContent = "Ljust läge";
        temaknapp.setAttribute("aria-label", "Byt till ljust läge");
    } else {
        temaknapp.textContent = "Mörkt läge";
        temaknapp.setAttribute("aria-label", "Byt till mörkt läge");
    }

    function bytTema() {
        const arMorkt = document.body.classList.toggle("morkt");
        if (arMorkt) {
            temaknapp.textContent = "Ljust läge";
            temaknapp.setAttribute("aria-label", "Byt till ljust läge");
            localStorage.setItem("mf_tema", "morkt");
        } else {
            temaknapp.textContent = "Mörkt läge";
            temaknapp.setAttribute("aria-label", "Byt till mörkt läge");
            localStorage.setItem("mf_tema", "ljust");
        }
    }

    temaknapp.addEventListener("click", bytTema);
}

// ==========================================================================
// 2. MOBILNAVIGERING (HAMBURGER-MENY MED TILLGÄNGLIGHET)
// ==========================================================================
const menyKnapp = document.querySelector("#meny-knapp");
const huvudmeny = document.querySelector("#huvudmeny");

if (menyKnapp && huvudmeny) {
    function toggleMeny(skallOppnas) {
        const oppen = typeof skallOppnas === "boolean"
            ? skallOppnas
            : !huvudmeny.classList.contains("oppen");

        huvudmeny.classList.toggle("oppen", oppen);
        menyKnapp.setAttribute("aria-expanded", oppen ? "true" : "false");
        menyKnapp.setAttribute("aria-label", oppen ? "Stäng meny" : "Öppna meny");
    }

    menyKnapp.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMeny();
    });

    // Stäng menyn när besökaren klickar på en länk
    huvudmeny.querySelectorAll("a").forEach((lank) => {
        lank.addEventListener("click", () => {
            toggleMeny(false);
        });
    });

    // Stäng vid klick utanför sidhuvudet
    document.addEventListener("click", (e) => {
        if (huvudmeny.classList.contains("oppen")) {
            if (!huvudmeny.contains(e.target) && !menyKnapp.contains(e.target)) {
                toggleMeny(false);
            }
        }
    });

    // Stäng med Escape-tangenten
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && huvudmeny.classList.contains("oppen")) {
            toggleMeny(false);
            menyKnapp.focus();
        }
    });
}