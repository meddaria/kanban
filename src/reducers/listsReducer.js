import { CONSTANTS } from "../actions";

let listID = 4;
let cardID = 0;

const initialState = [
    {
        title: "Backlog",
        id: `list-${0}`,
        cards: []
    },
    {
        title: "Ready",
        id: `list-${1}`,
        cards: []
    },
    {
        title: "In progress",
        id: `list-${2}`,
        cards: []
    },
    {
        title: "Finished",
        id: `list-${3}`,
        cards: []
    }
];

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });

            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];

            // dragging lists around
            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            //same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            //other list
            if (droppableIdStart !== droppableIdEnd) {
                // find rhe list where drag happend
                const listStart = state.find(list => droppableIdStart === list.id);

                // pull out the card
                const card = listStart.cards.splice(droppableIndexStart, 1);

                // find the list where drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);

                //put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        default:
            return state;
    }
};

export default listsReducer;