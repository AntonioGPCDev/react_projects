import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'

export function Filters () {

    const { filters, setFilters } = useFilters()

    const minPriceFilterId = useId()
    const categoryId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }


    return (
        <section className='filters'>

            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input
                    type='range'
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryId}>Categoría</label>
                <select id={categoryId} onChange={handleChangeCategory}>
                    <option value='all'>Todas</option>
                    <option value='laptops'>Portátiles</option>
                    <option value='smartphones'>Móviles</option>
                </select>
            </div>
        </section>
    )
}