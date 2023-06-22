import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Fullpizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63f9e49dbeec322c57e960a3.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        navigate('/');
        alert('Ошибка при получении пиццы!');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default Fullpizza;
