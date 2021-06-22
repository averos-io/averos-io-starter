import { AverosEntity, EntityViewLayout, getUseCaseViewLayout, 
         ID, OneToOne, UseCase, UseCaseViewLayout, User } from '@wiforge/averos';
import { Observable } from 'rxjs';
import { ToDoTaskService } from '../service/to-do-task.service';
import { ToDoStatus } from './to-do-status';


@AverosEntity(ToDoTaskService)
export class ToDoTask {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoTask>>;
    public static entityViewLayout : EntityViewLayout<ToDoTask>;
    public static entityName = 'ToDoTask';
    public static instanceMetadata = new ToDoTask();

    @ID()
    id: number;
    name: string;
    description: string;
    status: ToDoStatus;


    @OneToOne('User', import('@wiforge/averos')) createdBy?: User;
    @OneToOne('User', import('@wiforge/averos')) updatedBy?: User;

    static getEntityViewLayout(): Observable<EntityViewLayout<ToDoTask>> {
        return ToDoTask.entityViewLayout$;
    }

    static getUseCaseViewLayout(useCase: UseCase): Observable<UseCaseViewLayout<ToDoTask>>{
        return getUseCaseViewLayout(ToDoTask, useCase);
    }

}
