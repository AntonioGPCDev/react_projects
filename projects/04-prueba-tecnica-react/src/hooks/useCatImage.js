import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({fact}) {
    const [ imageUrl, setImageUrl ] = useState()

    useEffect(() => {
        if(!fact) return

        const threeFirstWords = fact.split(' ',3).join(' ') // tres primeras palabras

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50`)
            .then(res => res.json())
            .then(response => {
               const { url } = response
               setImageUrl(url)
            })
    }, [fact])

    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }

}