const React = require('react')

function New (props) {
    return(
        <div>
            <h1>New Vegetable Page</h1>
            <a href='/vegetables'>Go back to index Page</a>
            <form action="/vegetables" method="POST">
                Name: <input type="text" name="name"></input><br/>
                Color: <input type="text" name="color"></input><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat" id=""></input><br/>
                <input type="submit" value="Create Vegetable"></input>
            </form>
        </div>
    )
}

module.exports = New