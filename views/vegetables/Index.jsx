const React = require('react')

const DefaultLayout = require('../layouts/DefaultLayout')


class Index extends React.Component {

    render() {

        const { vegetable } = this.props

        return (
            <DefaultLayout title="All vegetable" foodGroup="vegetable">
                    <h1>vegetable Index Page</h1>
                    <ul id="vegetable-index">
                        {vegetable.map((vegetable) => {
                            return (
                                <li key={vegetable._id}>
                                    The <a href={`/vegetables/${vegetable._id}`}>{vegetable.name}</a> is {vegetable.color}.
                                </li>
                            )
                        })}
                    </ul>

                    <nav>
                        <a href="/vegetables/new">Create a new a vegetable</a>
                    </nav>
            </DefaultLayout>
        )
    }
}

module.exports = Index;