import { createContext } from "react";

const SettingsContext = createContext({});

export const SettingsProvider = SettingsContext.Provider;
export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
