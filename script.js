/* =========================================
   REDE.APOIO — VERSÃO 2
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const body = document.body;

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const year = document.getElementById("year");


/* =========================================
   ANO AUTOMÁTICO
========================================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   MENU MOBILE
========================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   NAV ACTIVE
========================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.id;

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );

            });

        });

    },

    {
        threshold: 0.25
    }

);


sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================
   ANIMAÇÕES REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   MODAL DE VIOLÊNCIAS
========================================= */

const violenceInfo = {

    fisica: {

        title: "Violência física",

        text:
            "É uma forma de violência relacionada a ações que atingem o corpo ou a integridade física da pessoa. O reconhecimento de sinais de agressão pode ser importante para buscar apoio e proteção."
    },

    psicologica: {

        title: "Violência psicológica",

        text:
            "Pode envolver comportamentos que provocam medo, humilhação, isolamento, controle, ameaça ou sofrimento emocional. Nem sempre existem marcas visíveis."
    },

    sexual: {

        title: "Violência sexual",

        text:
            "Está relacionada a situações em que a pessoa é constrangida, pressionada ou impedida de decidir livremente sobre sua vida sexual."
    },

    patrimonial: {

        title: "Violência patrimonial",

        text:
            "Pode envolver situações relacionadas a dinheiro, documentos, objetos, bens, recursos financeiros ou outros elementos que pertençam à pessoa."
    },

    moral: {

        title: "Violência moral",

        text:
            "Está relacionada a comportamentos que atingem a honra, reputação ou dignidade da pessoa."
    }

};


const modalButtons =
    document.querySelectorAll("[data-modal]");


modalButtons.forEach(button => {

    button.addEventListener("click", () => {

        const type = button.dataset.modal;

        const data = violenceInfo[type];

        if (!data) {
            return;
        }

        modalTitle.textContent = data.title;

        modalText.textContent = data.text;

        modalOverlay.classList.add("open");

        body.style.overflow = "hidden";

    });

});


function closeModal() {

    modalOverlay.classList.remove("open");

    body.style.overflow = "";

}


modalClose?.addEventListener(
    "click",
    closeModal
);


modalOverlay?.addEventListener(
    "click",
    event => {

        if (event.target === modalOverlay) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

            emergencyPopup?.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   QUIZ
========================================= */

const questions = [

    "Alguém tenta controlar com quem você fala ou onde você vai?",

    "Você é frequentemente humilhada, ameaçada ou diminuída?",

    "Alguém tenta controlar seu dinheiro, documentos ou pertences?",

    "Você sente medo da reação de alguém quando diz não ou discorda?",

    "Alguém tenta impedir você de procurar ajuda ou conversar com pessoas de confiança?"

];


let currentQuestion = 0;
let yesAnswers = 0;


const questionElement =
    document.getElementById("question");

const questionCount =
    document.getElementById("question-count");

const progress =
    document.getElementById("quiz-progress");

const answerButtons =
    document.querySelectorAll(".answer");

const resetQuiz =
    document.getElementById("resetQuiz");


function updateQuiz() {

    if (!questionElement) {
        return;
    }

    questionElement.textContent =
        questions[currentQuestion];

    questionCount.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / 05`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

}


answerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const answer =
            button.dataset.answer;

        if (answer === "yes") {
            yesAnswers++;
        }

        currentQuestion++;

        if (currentQuestion >= questions.length) {

            finishQuiz();

            return;
        }

        updateQuiz();

    });

});


function finishQuiz() {

    progress.style.width = "100%";

    questionCount.textContent = "FINALIZADO";

    let message = "";

    if (yesAnswers === 0) {

        message =
            "Obrigado por responder. Continue buscando informação e mantendo sua rede de apoio por perto.";

    } else if (yesAnswers <= 2) {

        message =
            "Algumas respostas indicam situações que merecem atenção. Considere conversar com alguém de confiança e buscar informações.";

    } else {

        message =
            "Várias respostas indicam situações que podem merecer atenção especial. Se houver risco, procure ajuda e priorize sua segurança.";

    }

    questionElement.textContent = message;

    document.querySelector(".answer-grid").innerHTML = `

        <button class="answer" id="quizHelp">
            Ver canais de apoio
            <span>→</span>
        </button>

        <button class="answer" id="quizRestart">
            Fazer novamente
            <span>↻</span>
        </button>

    `;


    document
        .getElementById("quizHelp")
        ?.addEventListener("click", () => {

            document
                .getElementById("apoio")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });


    document
        .getElementById("quizRestart")
        ?.addEventListener(
            "click",
            resetQuizFunction
        );

}


function resetQuizFunction() {

    currentQuestion = 0;

    yesAnswers = 0;

    document.querySelector(".answer-grid").innerHTML = `

        <button class="answer" data-answer="yes">
            Sim
            <span>→</span>
        </button>

        <button class="answer" data-answer="no">
            Não
            <span>→</span>
        </button>

    `;


    document
        .querySelectorAll(".answer")
        .forEach(button => {

            button.addEventListener(
                "click",
                quizAnswerHandler
            );

        });


    updateQuiz();

}


function quizAnswerHandler() {

    const answer =
        this.dataset.answer;

    if (answer === "yes") {
        yesAnswers++;
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

    } else {

        updateQuiz();

    }

}


resetQuiz?.addEventListener(
    "click",
    resetQuizFunction
);


updateQuiz();


/* =========================================
   BUSCA DE SERVIÇOS
========================================= */

const locationSearch =
    document.getElementById("locationSearch");

const serviceType =
    document.getElementById("serviceType");

const searchServices =
    document.getElementById("searchServices");

const searchResults =
    document.getElementById("searchResults");


const serviceNames = {

    todos: "serviços de apoio à mulher",

    DEAM: "DEAM Delegacia Especializada de Atendimento à Mulher",

    CRAS: "CRAS",

    CREAS: "CREAS",

    abrigo: "abrigo para mulheres em situação de violência",

    apoio: "centro de atendimento à mulher"

};


function searchLocation() {

    const location =
        locationSearch.value.trim();

    const type =
        serviceType.value;

    if (!location) {

        showToast(
            "Digite uma cidade, bairro ou CEP."
        );

        locationSearch.focus();

        return;
    }


    const service =
        serviceNames[type];


    const query =
        encodeURIComponent(
            `${service} ${location}`
        );


    const mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=${query}`;


    searchResults.innerHTML = `

        <article class="result-card">

            <div class="result-icon">
                ⌖
            </div>

            <div>

                <h3>
                    Pesquisa de ${service}
                </h3>

                <p>
                    Localização pesquisada:
                    ${escapeHTML(location)}
                </p>

            </div>

            <a
                href="${mapsUrl}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Abrir mapa ↗
            </a>

        </article>

    `;


    showToast(
        "Pesquisa de serviços preparada."
    );

}


searchServices?.addEventListener(
    "click",
    searchLocation
);


locationSearch?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            searchLocation();
        }

    }
);


/* =========================================
   PLANO DE SEGURANÇA
========================================= */

const securityForm =
    document.getElementById("securityForm");


const trustedPerson =
    document.getElementById("trustedPerson");

const trustedPhone =
    document.getElementById("trustedPhone");

const safePlace =
    document.getElementById("safePlace");

const planNotes =
    document.getElementById("planNotes");


const clearPlan =
    document.getElementById("clearPlan");

const printPlan =
    document.getElementById("printPlan");


function savePlan() {

    const plan = {

        person: trustedPerson.value,

        phone: trustedPhone.value,

        place: safePlace.value,

        notes: planNotes.value

    };


    localStorage.setItem(
        "redeApoioPlan",
        JSON.stringify(plan)
    );


    showToast(
        "Plano salvo neste navegador."
    );

}


securityForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        savePlan();

    }
);


function loadPlan() {

    const saved =
        localStorage.getItem(
            "redeApoioPlan"
        );


    if (!saved) {
        return;
    }


    try {

        const plan =
            JSON.parse(saved);

        trustedPerson.value =
            plan.person || "";

        trustedPhone.value =
            plan.phone || "";

        safePlace.value =
            plan.place || "";

        planNotes.value =
            plan.notes || "";

    } catch {

        localStorage.removeItem(
            "redeApoioPlan"
        );

    }

}


loadPlan();


clearPlan?.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Deseja realmente limpar o plano salvo neste navegador?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(
            "redeApoioPlan"
        );

        securityForm.reset();

        showToast(
            "Plano apagado deste navegador."
        );

    }
);


printPlan?.addEventListener(
    "click",
    () => {

        window.print();

    }
);


/* =========================================
   ASSISTENTE
========================================= */

const chatMessages =
    document.getElementById("chatMessages");


const chatOptions =
    document.querySelectorAll(
        "[data-chat]"
    );


const chatResponses = {

    violencia: {

        user: "Quero entender os tipos de violência",

        bot:
            "Você pode conhecer as cinco formas apresentadas neste projeto: física, psicológica, sexual, patrimonial e moral. Acesse a seção “Violências” para ver uma explicação de cada uma."

    },


    risco: {

        user: "Estou em uma situação de risco",

        bot:
            "Se existe perigo imediato, priorize sua segurança, procure um local seguro quando possível e acione o serviço de emergência adequado. Você também pode acessar os canais 190 e 180 na seção de apoio."

    },


    apoio: {

        user: "Quero encontrar apoio",

        bot:
            "Use a seção “Encontre ajuda” para pesquisar por cidade, bairro ou CEP e abrir uma busca de serviços de apoio próximos."

    },


    ajudar: {

        user: "Quero ajudar alguém",

        bot:
            "Escute sem julgamentos, respeite as decisões da pessoa, evite culpabilizá-la e ajude a encontrar informações seguras quando isso for apropriado."

    }

};


chatOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const type =
                button.dataset.chat;

            const data =
                chatResponses[type];

            if (!data) {
                return;
            }


            addMessage(
                data.user,
                "user"
            );


            setTimeout(() => {

                addMessage(
                    data.bot,
                    "bot"
                );

            }, 400);

        }
    );

});


function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================
   GLOSSÁRIO
========================================= */

const glossarySearch =
    document.getElementById(
        "glossarySearch"
    );


const glossaryCards =
    document.querySelectorAll(
        ".glossary-card"
    );


glossarySearch?.addEventListener(
    "input",
    () => {

        const term =
            glossarySearch.value
                .toLowerCase()
                .trim();


        glossaryCards.forEach(card => {

            const content =
                card.textContent
                    .toLowerCase();


            card.style.display =
                content.includes(term)
                    ? ""
                    : "none";

        });

    }
);


/* =========================================
   ACESSIBILIDADE
========================================= */

const accessibilityToggle =
    document.getElementById(
        "accessibilityToggle"
    );


const accessibilityPanel =
    document.getElementById(
        "accessibilityPanel"
    );


const fontDecrease =
    document.getElementById(
        "fontDecrease"
    );


const fontIncrease =
    document.getElementById(
        "fontIncrease"
    );


const contrastToggle =
    document.getElementById(
        "contrastToggle"
    );


const motionToggle =
    document.getElementById(
        "motionToggle"
    );


let fontScale =
    Number(
        localStorage.getItem(
            "redeApoioFontScale"
        )
    ) || 1;


function updateFontScale() {

    fontScale =
        Math.min(
            1.2,
            Math.max(
                0.9,
                fontScale
            )
        );


    document.documentElement.style
        .setProperty(
            "--font-scale",
            fontScale
        );


    localStorage.setItem(
        "redeApoioFontScale",
        fontScale
    );

}


updateFontScale();


accessibilityToggle?.addEventListener(
    "click",
    () => {

        accessibilityPanel.classList.toggle(
            "open"
        );

    }
);


fontIncrease?.addEventListener(
    "click",
    () => {

        fontScale += 0.05;

        updateFontScale();

    }
);


fontDecrease?.addEventListener(
    "click",
    () => {

        fontScale -= 0.05;

        updateFontScale();

    }
);


contrastToggle?.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "high-contrast"
        );

        localStorage.setItem(
            "redeApoioContrast",
            body.classList.contains(
                "high-contrast"
            )
        );

    }
);


motionToggle?.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "reduce-motion"
        );

        localStorage.setItem(
            "redeApoioMotion",
            body.classList.contains(
                "reduce-motion"
            )
        );

    }
);


if (
    localStorage.getItem(
        "redeApoioContrast"
    ) === "true"
) {

    body.classList.add(
        "high-contrast"
    );

}


if (
    localStorage.getItem(
        "redeApoioMotion"
    ) === "true"
) {

    body.classList.add(
        "reduce-motion"
    );

}


/* =========================================
   EMERGÊNCIA FLUTUANTE
========================================= */

const emergencyToggle =
    document.getElementById(
        "emergencyToggle"
    );


const emergencyPopup =
    document.getElementById(
        "emergencyPopup"
    );


const closeEmergency =
    document.getElementById(
        "closeEmergency"
    );


emergencyToggle?.addEventListener(
    "click",
    () => {

        emergencyPopup.classList.toggle(
            "open"
        );

    }
);


closeEmergency?.addEventListener(
    "click",
    () => {

        emergencyPopup.classList.remove(
            "open"
        );

    }
);


/* =========================================
   SAÍDA RÁPIDA
========================================= */

const quickExit =
    document.getElementById(
        "quickExit"
    );


quickExit?.addEventListener(
    "click",
    () => {

        showToast(
            "Saída rápida ativada."
        );


        setTimeout(() => {

            window.location.replace(
                "https://www.google.com/"
            );

        }, 250);

    }
);


/* =========================================
   VOLTAR AO TOPO
========================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backTop.classList.add(
                "visible"
            );

        } else {

            backTop.classList.remove(
                "visible"
            );

        }

    }
);


backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================
   SCROLL SUAVE
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        anchor.getAttribute("href")
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================
   CONSOLE
========================================= */

console.log(
    "✦ Rede.Apoio — Versão 2 carregada."
);