import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // faire le tri des événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // la fonction pour passer à la photo suivante
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  // useffect pour déclencher le changement de photo toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval); // nettoyage pour éviter les fuites de mémoire
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={`slide-${event.title}`} // key unique pour chaque événement
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event) => (
            <input
              key={`radio-${event.title}`} // utilise event.title pour une clé unique
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))} // mise à jour de l'index selon le bouton radio cliqué
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
