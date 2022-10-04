const React = require('react');
const DefaultLayout = require('../layouts/DefaultLayout');

// class component
class Show extends React.Component {

    render() {
        
        const { vegetable } = this.props

        return (
            <DefaultLayout title={`${vegetable.name} details`} foodGroup="vegetables">
                <h1>Show Page</h1>
                <p>
                    The {vegetable.name} is {vegetable.color}.
                </p>
                <p>
                    {vegetable.readyToEat ? "It is ready to eat!" : "It is NOT ready to eat... :("}
                </p>

                <button>
                    <a href={`/vegetables/${vegetable._id}/edit`}>Edit</a>
                </button>

                <form action={`/vegetables/${vegetable._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="Delete" />
                </form>

                <nav>
                    <a href="/vegetables">Back</a>
                </nav>
            </DefaultLayout>
        )
    }
}

module.exports = Show;