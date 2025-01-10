import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App(){

    const users = [
        { userName: 'midudev', name: 'Miguel Ángel Durán', isFollowing: true },
        { userName: 'AntonioGPC_31', name: 'Antonio GPC', isFollowing: false }
    ]
    
    return (
        <section className='App'>
            {
                users.map(user =>  {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCard
                            key={userName} 
                            userName={userName} 
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}