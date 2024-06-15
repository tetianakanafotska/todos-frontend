import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  { id: "task-1", content: "Task 1" },
  { id: "task-2", content: "Task 2" },
  { id: "task-3", content: "Task 3" },
];

function SimpleDnd() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    console.log("handledragend rigered");
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => {
          console.log("dropabble called", provided);
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                padding: "16px",
                backgroundColor: "#f8f9fa",
                minHeight: "100px",
              }}
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => {
                      console.log(
                        "draggable called",
                        provided,
                        "taskid",
                        task.id
                      );
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: "16px",
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: "#fff",
                            color: "#000",
                            textAlign: "center",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task.content}
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default SimpleDnd;
