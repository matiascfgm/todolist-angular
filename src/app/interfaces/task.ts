import { TaskState } from '../enums/task-state.enum';


export interface Task {
    id: number;

    name: string;
    description?: string;
    
    done: boolean;

    // not in use
    progress?: TaskState
}