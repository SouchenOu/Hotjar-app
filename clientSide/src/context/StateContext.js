import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export const useStateProvider = () => useContext(StateContext);
