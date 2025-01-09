import { useEffect, useState} from 'react';
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/${firstWord}?'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [ fact, setFact ] = useState()
    const [ imageUrl, setImageUrl ] = useState()

    useEffect (() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(response => response.json())
            .then(data => {

                const { fact } = data
                setFact(fact)

                const threefirstWords = fact.split(' ',3).join(' ') // tres primeras palabras
                console.log(threefirstWords)

                fetch(`https://cataas.com/cat/says/${threefirstWords}?size=50&color=red&json=true`)
                 .then(response => response.json())
                 .then(response =>{
                        const { url } = response
                        setImageUrl(url)
                 })
        })
    }, []) //Dependencias: Array vacío para que se ejecute la primera vez


    return (
        <main>
            <h1> App de gatitos </h1>
            {fact && <p>{fact}</p>} 
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Imagen extraída de las tres primeras palabras para ${fact}`}/>}
        </main>
        
    );
}