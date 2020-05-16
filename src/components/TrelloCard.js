import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import './App.css'

const TrelloCard = ({text, id, index}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
        {provided => (
            <div class='card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom>{text}</Typography>
                    </CardContent>
                </Card>
            </div>
        )}
        </Draggable>
    );
};

export default TrelloCard;