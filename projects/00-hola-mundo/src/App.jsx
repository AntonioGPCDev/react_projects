import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App(){
    
    return (
        <div className='App'>
            <TwitterFollowCard userName="midudev" initialIsFollowing={true}> 
                Miguel Ángel Durán
            </TwitterFollowCard> 
            <TwitterFollowCard userName="AntonioGPC_31">
                Antonio GPC
            </TwitterFollowCard>
        </div>
    )
}