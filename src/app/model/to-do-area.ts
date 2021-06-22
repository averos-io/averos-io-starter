
import { AverosEntity, EntityViewLayout, getUseCaseViewLayout,
         ID, OneToMany, OneToOne, UseCase, UseCaseViewLayout, User } from '@wiforge/averos';
import { Observable } from 'rxjs';
import { ToDoAreaService } from '../service/to-do-area.service';
import { ToDoTask } from './to-do-task';

@AverosEntity(ToDoAreaService)
export class ToDoArea {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoArea>>;
    public static entityViewLayout : EntityViewLayout<ToDoArea>;
    public static entityName = 'ToDoArea';
    public static instanceMetadata = new ToDoArea();

    @ID()
    id: number;
    name: string;
    description: string;
 

    @OneToMany('ToDoTask', import('./to-do-task')) 
    toDoTasks: [ToDoTask];
    @OneToOne('User', import('@wiforge/averos')) createdBy?: User;
    @OneToOne('User', import('@wiforge/averos')) updatedBy?: User;

    static getEntityViewLayout(): Observable<EntityViewLayout<ToDoArea>> {
        return ToDoArea.entityViewLayout$;
    }

    static getUseCaseViewLayout(useCase: UseCase): Observable<UseCaseViewLayout<ToDoArea>>{
        return getUseCaseViewLayout(ToDoArea, useCase);
    }

}
