
import { AverosEntity, ID, getUseCaseViewLayout, 
         EntityViewLayout, UseCase, UseCaseViewLayout, 
         User, OneToOne, ManyToOne } from '@wiforge/averos';
import { Observable } from 'rxjs';
import { ToDoTaskService } from '../service/to-do-task.service';
import { ToDoArea } from './to-do-area';
import { TaskStatus } from './task-status';

@AverosEntity(ToDoTaskService)
export class ToDoTask {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoTask>>;
    public static entityViewLayout : EntityViewLayout<ToDoTask>;
    public static entityName = 'ToDoTask';
    public static instanceMetadata = new ToDoTask();

    // Averos entity identifier is equal to 'id' by default
    // please change the identifier at your convenience
    @ID()
    id!: string;
    name!: string;
    description!: string;
    createdAt!: Date;
    updatedAt!: Date;
    @OneToOne('User', import('@wiforge/averos'))createdBy!: User;
    @OneToOne('User', import('@wiforge/averos'))updatedBy!: User;
    @ManyToOne('ToDoArea', import('./to-do-area')) toDoArea!: ToDoArea;
    taskStatus!: TaskStatus;


     
     /**
      * TODO: Add your custom entity members
      *
      */




    static getEntityViewLayout(): Observable<EntityViewLayout<ToDoTask>> {
        return ToDoTask.entityViewLayout$;
    }

    static getUseCaseViewLayout(useCase: UseCase): Observable<UseCaseViewLayout<ToDoTask>>{
        return getUseCaseViewLayout(ToDoTask, useCase);
    }

}