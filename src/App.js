import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MealList from './MealList';



function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  const apiKey = '24d9c5c58c454a64b2a965035f8f33b2';

  async function getRandomRecipes() {
    try {
      const resp = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`
      );
      setRecipes(resp.data.recipes);
    } catch (e) {
      console.log(e);
    }
  }
  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <div className='bg-emerald-100'>

<nav className="bg-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white italic">Food Mania</h1>
          <div className="">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <p className='font-bold text-4xl italic py-4 text-center text-fuchsia-700'>If you learn a recipe, you can cook the recipe. If you learn the technique, you can cook anything.</p>

      <section className="controls container mx-auto p-4">
        <p className='font-serif text-3xl '>In this Section you can plan your meal according to your calories</p>
        <p className='font-semibold text-xl italic text-cyan-600 py-4'>Stay Healthy</p>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
          className='px-4 py-2'
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
          onClick={getMealData}
        >
          Get Daily Meal Plan
        </button>
      </section>
      {mealData && <MealList mealData={mealData} />}


         <div className="container mx-auto p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-md cursor-pointer hover:shadow-2xl bg-cyan-700"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img src={recipe.image} alt={recipe.title} className="mb-2 rounded-xl" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={recipe.sourceUrl}
              className="text-lime-200 hover:underline font-serif italic"
            >
              {recipe.title}
            </a>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={selectedRecipe.sourceUrl}
              className="text-teal-950 hover:underline"
            >
              {selectedRecipe.title}
            </a>
          </h2>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="mb-2 rounded-md"
          />

          <div className="mb-2">
            <div className="font-semibold">Ingredients needed:</div>
            <div>
              {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                <span key={index} className="mr-2">
                  {ingredient.name}
                  {index !== selectedRecipe.extendedIngredients.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold">Instructions:</div>
            <ol className="list-decimal ml-4">
              {selectedRecipe.analyzedInstructions[0].steps.map((step, index) => (
                <li key={index}>{step.step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
    <footer className="bg-gray-700 py-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-white">© 2023 Food Mania. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
