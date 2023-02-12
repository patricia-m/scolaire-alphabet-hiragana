import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// -------------------------------------------------------------------------------------------- propriétés

// liste de tous les caractères
const caracteres = ref([])

// informations sur un caractère spécifique
const caractere_texte = ref(null)
const caractere_prononciation = ref("")
const caractere_audio = ref("")
const caractere_mots = ref([])

// -------------------------------------------------------------------------------------------- méthodes et fetch

// Appel à l'API (récupération de la liste des caractères)
fetch("http://jduranleau.cpsw-fcsei.com/module5/js/mi-session/api/liste.php").then(resp => resp.json()).then(resultat => {
    caracteres.value = resultat
})

/**
 * Affiche les informations du caractère sélectionné lors du clic
 */
function afficherInfos(caractere) {
    caractere_texte.value = caractere.texte
    caractere_prononciation.value = caractere.prononciation
    caractere_audio.value = caractere.audio

    // Appel à l'API (récupération de la liste des mots selon le caractère selectionné)
    const post = new FormData()
    post.set("caractere", caractere_texte.value)

    const options = {
        method: "POST",
        body: post,
    }

    fetch("http://jduranleau.cpsw-fcsei.com/module5/js/mi-session/api/mots.php", options).then(resp => resp.json()).then(resultat => {
        caractere_mots.value = resultat
    })
}

// --------------------------------------------------------------------------------------------

const root = {
    setup() {
        return {
            caracteres,

            caractere_texte,
            caractere_prononciation,
            caractere_audio,
            caractere_mots,

            afficherInfos,
        }
    }
}

createApp(root).mount('#app')