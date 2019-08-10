import { useSelector } from 'react-redux'

export default function App() {
    const model = useSelector(state => state)
    return (
        <h1>{model}</h1>
    )
}
