import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // reinitialise à la première page chaque fois que le filtre de type d'événement change
    setCurrentPage(1);
  }, [type]);

  let filteredEvents = [];
  if (data && data.events) {
    filteredEvents = type
      ? data.events.filter((event) => event.type === type)
      : data.events;
  }

  // événements pour la page actuelle
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // change le filtre de type d'événement
  const changeType = (evtType) => {
    setType(evtType);
  };

  // nombre total de pages basé sur les évenements filtrés
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // génère des types uniques pour le menu déroulant
  const typeList =
    data && data.events
      ? Array.from(new Set(data.events.map((event) => event.type)))
      : [];

  return (
    <>
      {error && <div>Une erreur est survenue</div>}
      {data === null ? (
        "chargement"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={["Toutes", ...typeList]} // ajout de "Toutes" comme première option
            onChange={(value) => changeType(value === "Toutes" ? null : value)} // rénitialise le filtre si "Toutes" est sélectionné
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
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
            {Array.from({ length: pageNumber }).map((_, n) => (
              <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
                className={currentPage === n + 1 ? "active" : ""}
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
