import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);


  // code original:
  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) < new Date(evtB.date) ? 1 : -1

  // tri des événements par date ascendante pour afficher les plus anciens en premier
  const byDateAsc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
      )
    : [];


// code original:
//     const nextCard = () => {
//       setTimeout(
//         () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
//         5000
//       );
//     };
//     useEffect(() => {
//       nextCard();
//     });
    

  // defilement automatique des photos avec setinterval
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval); // nettoyage de l'intervalle
  }, [byDateAsc.length]);

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.title} // key unique basée sur le titre de l'événement
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
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
          {byDateAsc.map((event, bulletIdx) => (
            <input
              key={`bullet-${event.title}`} // key unique pour chaques bullets
              type="radio"
              name="radio-button"
              checked={index === bulletIdx} // synchronisation avec l'index de l'image
              onChange={() => setIndex(bulletIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
