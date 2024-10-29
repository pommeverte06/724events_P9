// import { useState } from "react";
// import EventCard from "../../components/EventCard";
// import Select from "../../components/Select";
// import { useData } from "../../contexts/DataContext";
// import Modal from "../Modal";
// import ModalEvent from "../ModalEvent";

// import "./style.css";

// const PER_PAGE = 9;

// const EventList = () => {
//   const { data, error } = useData();
//   const [type, setType] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredEvents = (data?.events || [])
//     .filter((event) => !type || event.type === type)
//     .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

//   const changeType = (evtType) => {
//     setCurrentPage(1);
//     setType(evtType);
//   };

//   const pageNumber = Math.ceil(
//     (data?.events.filter((event) => !type || event.type === type).length || 0) /
//       PER_PAGE
//   );
//   const typeList = [
//     "Toutes",
//     ...new Set(data?.events.map((event) => event.type)),
//   ];

//   return (
//     <>
//       {error && <div>une erreur s&apos;est produite</div>}
//       {data === null ? (
//         "loading"
//       ) : (
//         <>
//           <h3 className="SelectTitle">Catégories</h3>
//           <Select
//             selection={typeList}
//             onChange={(value) => changeType(value === "Toutes" ? null : value)}
//           />
//           <div id="events" className="ListContainer">
//             {filteredEvents.map((event) => (
//               <Modal key={event.id} Content={<ModalEvent event={event} />}>
//                 {({ setIsOpened }) => (
//                   <EventCard
//                     onClick={() => setIsOpened(true)}
//                     imageSrc={event.cover}
//                     title={event.title}
//                     date={new Date(event.date)}
//                     label={event.type}
//                   />
//                 )}
//               </Modal>
//             ))}
//           </div>
//           <div className="Pagination">
//             {Array.from({ length: pageNumber }, (_, n) => (
//               <a
//                 key={`page-${n + 1}`}
//                 href="#events"
//                 onClick={() => setCurrentPage(n + 1)}
//               >
//                 {n + 1}
//               </a>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default EventList;


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
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Vérifiez que `data` et `data.events` existent avant de filtrer
  let filteredEvents = [];
  if (data && data.events) {
    filteredEvents = type
      ? data.events.filter((event) => event.type === type)
      : data.events;
  }

  // Filtrage des événements par page
  const paginatedEvents = filteredEvents.filter((_, index) => 
    (currentPage - 1) * PER_PAGE <= index && index < currentPage * PER_PAGE
  );

  // Fonction pour changer le type d'événement filtré
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Calcul du nombre de pages
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // Génération de la liste de types (catégories d'événements)
  const typeList = data && data.events
    ? Array.from(new Set(data.events.map((event) => event.type)))
    : [];

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={["Toutes", ...typeList]} // Ajout de "Toutes" en première position
            onChange={(value) => changeType(value === "Toutes" ? null : value)} // Réinitialise le filtre si "Toutes" est sélectionné
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
