import { TaskState } from '../enums/task-state.enum';


export interface Task {
    /**
     * @var id It is is a string because Firebase uses HASHes instead of IDs
     */
    id: string;

    name: string;
    description?: string;
    
    done: boolean;

    // not in use
    progress?: TaskState
}