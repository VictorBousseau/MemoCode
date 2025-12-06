import React, { createContext, useContext } from 'react';

export const NavigationContext = createContext({
    currentView: 'Overview',
    navigationParams: null,
    navigate: (view, params) => { }
});

export const useNavigation = () => useContext(NavigationContext);
