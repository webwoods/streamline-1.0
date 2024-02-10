Notifications implementation depends on the following methodology.

# 1. Parent and Child Entities

There are several child entities. The following entities must be creted in the `backend\libs\core\src\entities` folder

- RequestNotification
- RequestItemNotification
- StoreItemNotification
- FileNotification
- UserNotification
- RoleNotification
- VendorNotification

## notification.entity.ts
*(Don't Edit This File)*

This is the **super class** of all notification types. This is a `Entity()` with `@TableInheritance()`. Table inheritance is set so that any child entities created will be saved in a single table instead of multiple tables.

e.g. If there are `ChildEntity()` such as `RequestNotification`, `FileNotification`, `UserNotification` etc., instead of saving the records in 3 separate tables, all these data will be saved in a single `Notification` table. The `type` column specifies the type of the notification.

![image](https://github.com/Web-Woods/streamline-procurement/assets/88420631/e7854fe0-8021-4316-8fa6-97850882f7eb)

```
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToMany, TableInheritance } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { NotificationReciever } from './notification-reciever.entity';

@Entity()
@ObjectType()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Notification extends StreamLineEntity {
    @Column()
    @Field()
    message!: string;

    @Column()
    @Field()
    senderId!: string;

    @OneToMany(() => NotificationReciever, (entity: NotificationReciever) => entity.notification)
    @Field(() => [Notification], { nullable: true })
    recievers?: NotificationReciever[];
}
```

## request.entity.ts
*(Don't Edit This File)*

The `RequestNotification` has already been implemented, and the other entities should be implemented in the same way.  
file path: `backend\libs\core\src\entities\request-notification.entity.ts`

The class should be of `@ChildEntity()` instead of `@Entity()`. `@Entity()` creates a seprate table, where as `@ChildEntity()` adds records to parent table.

The body of the class can vary based on the notification type. Make sure to map with correct relationships

```
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn, ChildEntity } from 'typeorm';
import { Request } from './request.entity';

import { Notification } from './notification.entity';

// NOTE : this Notification entitiy should be properly imported. There are also a Notification entity/object type from other packages which do not support the current implementation.

@ChildEntity() // instead of @Entity(),  use @ChildEntity()
@ObjectType()
export class RequestNotification extends Notification {

    // the body of the class can vary based on the notification type.
    // make sure to map with correct relationships

    @Column({ name: 'request_id', nullable: true })
    @Field({ nullable: true })
    requestId?: string;

    @ManyToOne(() => Request, (entity: Request) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'request_id', referencedColumnName: 'id' })
    request: Request;

}
```

Make sure to add the reverse map also. In this case, a reverse mapping from `Request` is added.

```
import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, AfterInsert, AfterUpdate, EntityManager, DataSource, getRepository } from 'typeorm';
import { RequestType } from './enum/requestType';
import { RequestNotification } from './request-notification.entity';

@Entity()
@ObjectType()
export class Request extends StreamLineEntity {
  // other fileds and columns

  @OneToMany(() => RequestNotification, (entity: RequestNotification) => entity.request)
  @Field(() => [RequestNotification], { nullable: true })
  notifications: RequestNotification[];
}
```

## notification-reciever.entity.ts
file path: `backend\libs\core\src\entities\notification-reciever.entity.ts`

The keeps track of recievers who recievees notifications. Without this entity, the created notifications will not reach any user or part of the system.

```
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class NotificationReciever extends StreamLineEntity {
    @Column()
    @Field()
    recieverId: string;

    @Column()
    @Field({ defaultValue: false })
    isRead: boolean

    @ManyToOne(() => Notification, (entity: Notification) => entity.recievers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'notification_id', referencedColumnName: 'id' })
    @Field(() => Notification, { nullable: true })
    notification?: Notification;

    @Column({ name: 'notification_id', nullable: true })
    @Field({ nullable: true })
    notificationId?: string;
}
```

# 2. Modules for Parent and Child Entities

The following modules must be creted in the `backend\libs\core\src\modules` folder. This way, the entities can be exposed to the Notifications service and the resolver.

- request-notification.module.ts
- requestItem-notification.module.ts
- storeItem-notification.module.ts
- file-notification.module.ts
- user-notification.module.ts
- role-notification.module.ts
- vendor-notification.module.ts

The `request-notification.module.ts` and the `notification-reiver.module.ts` has already been created.

## request-notification.module.ts
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItemNotification])],
})
export class RequestNotificationModule {}
```

## notification-reciever.module.ts
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationReciever } from '../entities/notification-reciever.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationReciever])],
})
export class NotificationRecieverModule {}
```

## notification.module.ts
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationRecieverModule } from './notification-reciever.module';
import { RequestNotificationModule } from './request-notification.module';
import { NotificationService } from '../services/notifiation.service';
import { RequestNotification } from '../entities/request-notification.entity';
import { NotificationReciever } from '../entities/notification-reciever.entity';
import { NotificationResolver } from '../resolvers/notification.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Notification, 
        RequestNotification, 
        NotificationReciever
        // here the other child entities must be added in order to expose the entities for the notification service
    ]),

    NotificationRecieverModule,
    RequestNotificationModule,
  ],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
```

# 3. Connecting the Notification entities to the Procurement App

## procurement-plugin.module.ts
file path: `backend\apps\procurement-plugin\src\procurement-plugin.module.ts`

The created child entities and the parent entity must be added into the `entities` section of the TypeORM configurations. This creates the relevant tables and exposes the entities to other entities. Note that, there is also another entity named `NotificationReciever`. This must also be addded.

```
@Module({
  imports: [
    ProcurementModule,

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
	// graphql settings
    }),

    TypeOrmModule.forRoot({
	// other config options for typeorm
      entities: [
        // other entities
        
        Notification,
        NotificationReciever,
        RequestNotification,
        // Vendor,
      ],
      synchronize: true,
    }),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
  exports: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
```

## procurement.module.ts
file path: ``

```
import { Module } from '@nestjs/common';
import { ProcurementService } from '../services/procurement.service';
import { ProcurementResolver } from '../resolvers/procurement.resolver';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    // other imports
    NotificationModule, // import NotificationsModule
  ],
  exports: [ProcurementService],
  providers: [ProcurementService, ProcurementResolver],
})
export class ProcurementModule {}
```

There are no separate `.service.ts` and `.resolver.ts` files for each individual child entity. Instead a common `notitification.service.ts` and `notification.resolver.ts` has already been added and connected to the procurement app.

Once all the entities have been created and connected to the procurement app, leave a comment "DONE" to proceed with the next steps.