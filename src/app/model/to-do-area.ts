import { AverosEntity, EntityViewLayout, 
         getUseCaseViewLayout, OneToMany, 
         OneToOne, UseCase, User } from '@wiforge/averos';
import { UseCaseViewLayout } from '@wiforge/averos/view/_models/entity-view-layout/use-case-view-layout';
import { Observable } from 'rxjs';
import { ToDoTask } from './to-do-task';

@AverosEntity(ToDoArea)
export class ToDoArea {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoArea>>;
    public static entityViewLayout : EntityViewLayout<ToDoArea>;
    public static entityName = 'ToDoArea';
    public static instanceMetadata = new ToDoArea();


    _id: number;
    name: string;
    description: string;
 

    @OneToMany('ToDoTask', import('./to-do-task')) 
    toDoTasks: ToDoTask[];
    @OneToOne('User', import('@wiforge/averos')) createdBy?: User;
    @OneToOne('User', import('@wiforge/averos')) updatedBy?: User;

    static getEntityViewLayout(): Observable<EntityViewLayout<ToDoArea>> {
        return ToDoArea.entityViewLayout$;
    }

    static getUseCaseViewLayout(useCase: UseCase): Observable<UseCaseViewLayout<ToDoArea>>{
        return getUseCaseViewLayout(ToDoArea, useCase);
    }

}
