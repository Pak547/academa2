import auth from '../utils/auth';
import { useState } from 'react';
import {ADD_CARD_SET} from '../utils/mutations';
import { useMutation } from '@apollo/client';
const CreateCardSet = () => {
    const { _id } = (auth.getProfile()).data;
    const [formState, setFormState] = useState({title: '', cardSet: '', name: ''});
    const [addCardSet, {error}] = useMutation(ADD_CARD_SET);

  //form submission for adding a new card set
  // we have to create routes for this
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addCardSet({
                variables: {...formState, userId: _id}
            });
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Create a Card Set</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cardSet">Card Set:</label>
                    <textarea name="cardSet" id="cardSet" onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={handleChange} />
                </div>
                <button type="submit">Create Card Set</button>
            </form>
        </div>
    );
};

export default CreateCardSet;