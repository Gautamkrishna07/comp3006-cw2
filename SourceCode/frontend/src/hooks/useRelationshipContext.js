import { useContext } from "react";

import { RelationshipContext } from "../context/RelationshipContext";

export const useRelationship = () => {
    const context = useContext(RelationshipContext);

    if (!context) {
        throw Error("Context was null, RelationshipContext must be used within RelationshipContextProvider.");
    }

    return context;
};
