import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './home.css';

import {boxs} from '../../data/boxs';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  width: 50,
  height: 50,
  ...draggableStyle
});

const getItemColor = (color) => ({
  background: color
});

class Home extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: boxs
    };
  }

  onDragEnd = result => {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  render() {
    return (
      <div className="fix-container home-page">
        <div className="box-main">
          <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.items.map((item, index) => (
            <Droppable droppableId={item.id} >
              {(droppableProvided, droppableSnapshot) => (
                <div className="square square_" ref={droppableProvided.innerRef} style={getItemColor(item.color)}>
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(draggableProvided, draggableSnapshot) => (
                        <div ref={draggableProvided.innerRef}
                                 {...draggableProvided.draggableProps}
                                 {...draggableProvided.dragHandleProps}
                             style={getItemStyle(
                                      draggableSnapshot.isDragging,
                                      draggableProvided.draggableProps.style
                                    )}>
                        </div>
                      )}
                    </Draggable>
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }

}
export default Home;


