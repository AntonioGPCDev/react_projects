import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export function useCatFact  () {
    const [fact, setFact] = useState()

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }
    useEffect (refreshFact,[]) //Dependencias: Array vacío para que se ejecute la primera vez

    return { fact, refreshFact}
}