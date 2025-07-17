export type TaskId = string | number;
export type TaskState = 'all' | 'completed' | 'pending';

export type Task = {
id:TaskId,
timestamp:number,
text:string,
completed:boolean
}


