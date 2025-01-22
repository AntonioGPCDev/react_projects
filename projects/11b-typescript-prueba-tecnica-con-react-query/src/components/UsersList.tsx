import { SortBy, type User } from '../types.d'

interface Props {
    users: User []
    showColors: boolean
    deleteUser: (email: string) => void
    changeSorting: (sort: SortBy) => void
}

export function UsersList ({ changeSorting, deleteUser, showColors, users }: Props){
    return(
        <table width='100%'>
            <thead>
                <tr>
                <th>Foto</th>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => changeSorting(SortBy.LAST)}>Apellidos</th>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>País</th>
                <th>Acciones</th>
                </tr>
            </thead>

            <tbody className={showColors ? 'table--showColors' : ''}>
                {
                    users.map((user) => {
                        return(
                            <tr key={user.email}>
                                <td>
                                    <img src={user.picture.thumbnail} alt="User Thumbnail" />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button type="button" onClick={() => {
                                        deleteUser(user.email)
                                    }}>Borrar</button>
                                </td>
                            </tr>
                        )
                        
                    })
                }
            </tbody>
        </table>
    )
}