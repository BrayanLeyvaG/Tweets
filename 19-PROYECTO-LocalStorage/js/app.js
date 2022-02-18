const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
const tweet = document.querySelector('#tweet')
let tweets = []

eventListeners()
function eventListeners() {
    formulario.addEventListener('submit', agregarTweet)

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []

        crearHTML()
    })
}

function agregarTweet(e) {
    e.preventDefault()
    limpiarHTML()

    if(tweet.value){
        const tweetObj = {
            id: Date.now(),
            tweet: tweet.value
        }
        tweets = [...tweets, tweetObj]
        console.log(tweets)

        crearHTML()

    }else{
        mensajeVacio('El mensaje no puede ir vacio')
    }
}

function mensajeVacio(mensaje) {
    const parrafoError = document.createElement('p')
    parrafoError.classList.add('error')

    parrafoError.textContent = mensaje

    const contenido = document.querySelector('#contenido')

    contenido.appendChild(parrafoError)

    formulario.addEventListener('submit', () => {
        parrafoError.remove()
    })

    tweet.addEventListener('click', () =>{
        parrafoError.remove()
    })
}

function crearHTML() {
    limpiarHTML()

    if(tweets.length>0){
        tweets.forEach(tweet =>{
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X'
            
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }


            const li = document.createElement('li')
            li.innerText = tweet.tweet

            li.appendChild(btnEliminar)

            listaTweets.appendChild(li)
        })
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))

}

function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)

    crearHTML()
}