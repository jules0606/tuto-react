import {getImageUrl } from './utils.js'
import {people} from './data.js'
import { Fragment } from 'react';
import { recipes } from './data.js';

const chemists = [];
const others = [];
people.forEach(person => {
if(person.profession === 'chemist') {
    chemists.push(person);
} else {
    others.push(person);
}
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
            <Fragment key={person.id}>
            <img src={getImageUrl(person)} alt={person.name}/>
            <h1>{person.name}</h1>
            <p>{' ' + person.profession + ' '} known for {person.accomplishment}</p>
            </Fragment>
        )}
      </ul>
    </>
  );
}

function ListRecipes() {
return (
    <div>
    <h1>Recipes</h1>
    {recipes.map(recipe => 
        <Fragment key={recipe.id}>
        <h2>{recipe.name}</h2>
        <ul>
        {recipe.ingredients.map(ingredient => 
            <li key={ingredient}>
            {ingredient}
            </li>
        )
        }    
        </ul>
        </Fragment>
    )
    }
    </div>
  );
}

export default function Profile() {
  return (
    <>
    <ListRecipes />
    <article>
      <h1>Scientists</h1>
      <ListSection title='Chemists' people={chemists}/>
      <ListSection title='Everyone Else' people={others}/>
    </article>
    </>
  );
}