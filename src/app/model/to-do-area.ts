
import { AverosEntity, ID, getUseCaseViewLayout, 
         EntityViewLayout, UseCase, UseCaseViewLayout, 
         User, OneToOne, OneToMany } from '@wiforge/averos';
import { Observable } from 'rxjs';
import { ToDoAreaService } from '../service/to-do-area.service';
import { ToDoTask } from './to-do-task';

@AverosEntity(ToDoAreaService)
export class ToDoArea {
    public static entityViewLayout$: Observable<EntityViewLayout<ToDoArea>>;
    public static entityViewLayout : EntityViewLayout<ToDoArea>;
    public static entityName = 'ToDoArea';
    public static instanceMetadata = new ToDoArea();

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
    @OneToMany('ToDoTask', import('./to-do-task')) toDoTasks!: ToDoTask[];

     
     /**
      * TODO: Add your custom entity members
      *
      */




    static getEntityViewLayout(): Observable<EntityViewLayout<ToDoArea>> {
        return ToDoArea.entityViewLayout$;
    }

    static getUseCaseViewLayout(useCase: UseCase): Observable<UseCaseViewLayout<ToDoArea>>{
        return getUseCaseViewLayout(ToDoArea, useCase);
    }

}