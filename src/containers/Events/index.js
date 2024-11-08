import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // modifs : ajout de "null" pour l'affichage de toutes les catégories (par défaut)
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = (data?.events || [])
    // modifs: application du filtre de type et de la pagination
    .filter((event) => !type || event.type === type) // si type est null, tous les évènements sont inclus
    .filter(
      (_, index) =>
        (currentPage - 1) * PER_PAGE <= index && index < currentPage * PER_PAGE // permet la sélection des évènements pour la page actuelle
    );

  // modifs:calcul du nombre de pages pour afficher les évènemments
  // code original:
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const pageNumber = Math.ceil(
    (data?.events?.filter((event) => !type || event.type === type).length ||
      0) / PER_PAGE
  );

  const typeList = new Set(data?.events.map((event) => event.type));

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={["Toutes", ...typeList]} // modifs: ajout de "Toutes" pour réinitialiser le filtre
            onChange={(value) => changeType(value === "Toutes" ? null : value)} // modifs: si "Toutes" est cliquée, type est défini à "null" pour afficher tous les événements
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`} // modifs: key unique basée sur le numéro de page
                href="#events"
                onClick={() => setCurrentPage(n + 1)} // modif: changement de page au clic
                className={currentPage === n + 1 ? "active" : ""} // classe "active" pour la page actuelle
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
