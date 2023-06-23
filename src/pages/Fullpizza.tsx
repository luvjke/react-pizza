import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Fullpizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
    return <div>Загрузка...</div>;
  }
  return (
    <div className="container">
      <img alt="aa" src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default Fullpizza;
