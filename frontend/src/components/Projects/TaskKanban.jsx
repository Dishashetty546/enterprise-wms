/**
 * TaskKanban.jsx
 * ---------------
 * A Kanban board component for displaying and managing tasks in a project.
 * Implements drag-and-drop functionality using react-beautiful-dnd.
 *
 * Features:
 *  - Columns: Backlog, To Do, In Progress, Review, Done
 *  - Drag-and-drop tasks between columns
 *  - Real-time Redux state update on task movement
 *  - Toast notifications on task move
 *
 * Author: Disha Shetty
 * Date: 2025-08-16
 * Version: 1.0
 */

import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { selectTasksByStatus, taskMoved } from "@/features/tasks/taskSlice";
import { toast } from "react-toastify";

/**
 * Kanban column definitions
 */
const COLUMNS = [
  { id: "BACKLOG", name: "Backlog" },
  { id: "TODO", name: "To Do" },
  { id: "IN_PROGRESS", name: "In Progress" },
  { id: "REVIEW", name: "Review" },
  { id: "DONE", name: "Done" },
];

/**
 * TaskKanban Component
 * 
 * @param {Object} props
 * @param {string} props.projectId - ID of the project whose tasks are displayed
 */
const TaskKanban = ({ projectId }) => {
  const dispatch = useDispatch();

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(() => COLUMNS, []);

  // Select tasks from Redux store grouped by column
  const tasksByCol = {};
  for (const c of columns) {
    tasksByCol[c.id] = useSelector((s) => selectTasksByStatus(s, projectId, c.id));
  }

  /**
   * Handle task drag-and-drop event
   * 
   * @param {Object} result - Result object from react-beautiful-dnd
   */
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside droppable area, do nothing
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    // If task is dropped in the same position, do nothing
    if (from === to && source.index === destination.index) return;

    // Dispatch Redux action to update task order
    dispatch(taskMoved({ taskId: draggableId, from, to, newIndex: destination.index }));

    // Notify user of task movement
    toast.info(`Moved task to ${to.replace("_", " ")}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 min-h-[300px]"
              >
                <div className="font-semibold mb-2">{col.name}</div>

                {tasksByCol[col.id].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(p) => (
                      <div
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        data-testid={`task-${task.id}`}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow p-3 mb-2"
                      >
                        <div className="text-sm font-medium">{task.title}</div>
                        <div className="text-xs opacity-70">
                          {task.type} • {task.priority}
                        </div>

                        {/* Screen-reader only button for integration tests when DnD not supported */}
                        <button
                          className="sr-only"
                          aria-label={`move-${task.id}-${col.id}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskKanban;
