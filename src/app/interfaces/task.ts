import { TaskState } from '../enums/task-state.enum';


export interface Task {
    /**
     * @var id It is is a string because Firebase uses HASHes instead of IDs
     */
    id: string;

    /**
     * @var name the name of the task.
     */
    name: string;

    /**
     * @var description (optional) a description for the task.
     */
    description?: string;
    
    /**
     * @var done True if the task is done
     */
    done: boolean;

    /**
     * @var progress: The progress of the task
     */
    progress?: TaskState
}