import {
    createContext,
    useState,
    ReactNode,
    useCallback,
    useContext,
} from "react";
import type { AlertColor } from "@mui/material";

type AlertItem = {
    id: number;
    message: string;
    severity: AlertColor;
};

type AlertContextType = {
    addAlert: (message: string, severity: AlertColor) => void;
    alerts: AlertItem[];
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    // Function to add a new alert
    const addAlert = useCallback((message: string, severity: AlertColor) => {
        const id = Date.now(); // Unique ID based on timestamp
        setAlerts((prev) => [...prev, { id, message, severity }]);

        // Auto-remove alert after 3 seconds
        setTimeout(() => {
            setAlerts((currentAlerts) =>
                currentAlerts.filter((alert) => alert.id !== id)
            );
        }, 3000);
    }, []);

    return (
        <AlertContext.Provider value={{ addAlert, alerts }}>
            {children}
        </AlertContext.Provider>
    );
};

const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

export { AlertContext, AlertProvider, useAlert };
