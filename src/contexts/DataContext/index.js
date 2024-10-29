

import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    const json = await response.json();
    return json;
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  // calcul de l'événement le plus récent
  const lastEvent = useMemo(() => {
    if (!data?.events) return null;
    return data.events.reduce((latest, event) => {
      const eventDate = new Date(event.date);
      return eventDate > new Date(latest.date) ? event : latest;
    }, data.events[0]);
  }, [data]);

  const contextValue = useMemo(() => ({
    data,
    error,
    lastEvent,
  }), [data, error, lastEvent]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
