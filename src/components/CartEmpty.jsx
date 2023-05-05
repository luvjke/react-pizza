import React from 'react';
import { Link } from 'react-router-dom';
import CardEmptyImg from '../assets/empty-cart.png';
function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <icon>😓</icon>
        </h2>
        <p>
          Вероятней,всего,вы не заказали ещё пиццу.
          <br />
          Для того,чтобы заказать пиццу,перейдите на главную страницу.
        </p>
        <img src={CardEmptyImg} alt="EmptyImg"></img>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
}

export default CartEmpty;
