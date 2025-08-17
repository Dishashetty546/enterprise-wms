/**
 * KanbanBoard.jsx
 * ----------------
 * A simple Kanban board component for displaying tasks in a project.
 * Implements drag-and-drop functionality using react-beautiful-dnd.
 *
 * Features:
 *  - Columns: Backlog, In Progress, Done
 *  - Drag-and-drop tasks between columns
 *  - Updates tasks in the fake server using moveTask API
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveTask } from '../api/fakeServer';

/**
 * Kanban column definitions
 */
const columns = [
  { key: 'backlog', title: 'Backlog' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];

/**
 * KanbanBoard Component
 * ---------------------
 * Renders a Kanban board with tasks grouped by status and allows drag-and-drop.
 *
 * @param {Object} props
 * @param {string} props.projectId - ID of the project
 * @param {Object} props.tasks - Object containing arrays of tasks for each column
 */
export default function KanbanBoard({ projectId, tasks }) {

  /**
   * Handle drag-and-drop completion
   *
   * @param {Object} result - Object containing source, destination, and draggableId
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the board, do nothing
    if (!destination) return;

    // Call API helper to move the task
    moveTask(
      projectId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-4">
        {columns.map(col => (
          <Droppable droppableId={col.key} key={col.key}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl min-h-[300px]"
              >
                <div className="font-semibold mb-2">{col.title}</div>

                {tasks[col.key]?.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-2 p-3 rounded-xl bg-white dark:bg-gray-700 shadow"
                      >
                        <div className="text-sm font-medium">{task.title}</div>
                        <div className="text-xs opacity-70">
                          {task.type} • {task.priority} • {task.assignee}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
