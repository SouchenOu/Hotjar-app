import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Define prop types
StateProvider.propTypes = {
  initialState: PropTypes.object.isRequired, // Assuming initialState is an object
  reducer: PropTypes.func.isRequired, // Assuming reducer is a function
  children: PropTypes.node.isRequired, // Specify that children is required
};

export const useStateProvider = () => useContext(StateContext);
