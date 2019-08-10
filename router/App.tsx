import { Suspense, lazy } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <ul>
                <li><NavLink to="/">home</NavLink></li>
                <li><NavLink to="/foo">foo</NavLink></li>
                <li><NavLink to="/bar">bar</NavLink></li>
            </ul>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/foo" component={lazy(() => import('./Foo'))}/>
                    <Route path="/bar" component={lazy(() => import('./Bar'))}/>
                    <Route render={() => <h1>Hello World</h1>}/>
                </Switch>
            </Suspense>
        </div>
    )
}

function Spinner() {
    return <h1>Loading....</h1>
}