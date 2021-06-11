
import { AverosEntity, EntityViewLayout, 
         getUseCaseViewLayout,
         OneToOne, UseCase, User } from '@wiforge/averos';
import { UseCaseViewLayout } from '@wiforge/averos/view/_models/entity-view-layout/use-case-view-layout';
import { Observable } from 'rxjs';
import { ToDoStatus } from './to-do-status';


@AverosEntity(ToDoTask)
export class ToDoTask {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoTask>>;
    public static entityViewLayout : EntityViewLayout<ToDoTask>;
    public static entityName = 'ToDoTask';
    public static instanceMetadata = new ToDoTask();

    _id: number;
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
