const React = require('react')

function Edit (props) {
    const {name, _id, readyToEat, color} = props.vegetable
    return(
        <div>
            <h1>{name} Edit Page</h1>
            <a href='/vegetables'>Go back to Index Page</a>
            <form action={`/vegetables/${_id}?_method=PUT`} method='POST'>
                Name: <input type="text" name="name" defaultValue={name}/><br/>
                Color: <input type="text" name="color" defaultValue={color}/><br/>
                Is Ready To Eat: {readyToEat? <input type="checkbox" name="isReadyToEat" defaultChecked />: <input type="checkbox" name="isReadyToEat"/>}<br/>
                <input type="submit" value="Update Vegetable" />
            </form>
        </div>
    )
}

module.exports = Edit