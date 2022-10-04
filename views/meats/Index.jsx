const React = require('react')
const DefaultLayout = require('../layouts/DefaultLayout')


class Index extends React.Component {

    render() {

        const { meats } = this.props

        return (
            <DefaultLayout title="All meat" foodGroup="meats">
                    <h1>meats Index Page</h1>
                    <ul id="meats-index">
                        {meats.map((meat) => {
                            return (
                                <li key={meat._id}>
                                    The <a href={`/meats/${meat._id}`}>{meat.name}</a> is {meat.color}.
                                </li>
                            )
                        })}
                    </ul>

                    <nav>
                        <a href="/meats/new">Create a new a meat</a>
                    </nav>
            </DefaultLayout>
        )
    }
}

module.exports = Index;