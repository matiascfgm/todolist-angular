export const enum TaskState {
    /**
     * The state for tasks that have not been started yet.
     */
    Open = 'open', 

    /**
     * When the task is in progress, we set it to this
     */
    InProgress = 'in progress',

    /**
     * Set this when the task is DONE
     */
    Done = 'open',
}