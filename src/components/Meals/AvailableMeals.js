import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItemForm from './MealItem/MealItemForm';
import styles from '../UI/Card.module.css';
import { useContext, useState, useEffect } from 'react';
import cartContext from '../../Context/Context';
import useFetch from '../../hooks/hook';

const URL = 'https://movies-api-e583e-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
  const cartCtx = useContext(cartContext);
  const [mealsData, setMealsData] = useState([]);
  const { error, isLoading ,sendRequest:fetchMeals } = useFetch();

  useEffect(()=>{
    const getMeals=(data)=>{
      const loadedMeals=Object.keys(data).map((key)=>({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price
      }));  
      setMealsData(loadedMeals)
    }
    fetchMeals({url:URL},getMeals)
  },[fetchMeals])

  let content;

  if (isLoading) {
    content = <p className={`${classes.loading} ${classes.centered}`}>Loading...</p>;
  }

  if (error) {
    content = <p className={`${classes.error} ${classes.centered}`}>{error}</p>;
  }

  if (!isLoading && !error && mealsData.length > 0) {
    content = (
      <ul>
        {mealsData.map((meal) => (
          <li key={meal.id}>
            <div>
              <h3>{meal.name}</h3>
              <div className={classes.description}>{meal.description}</div>
              <div className={classes.price}>${meal.price.toFixed(2)}</div>
            </div>
            <div>
              <MealItemForm
                onAddToCart={(amount) => cartCtx.addItem({ ...meal, amount })}
                id={meal.id}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className={classes.meals}>
      <Card className={styles.card}>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
