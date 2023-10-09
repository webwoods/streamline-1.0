import { Entity } from "typeorm";
import { Properties } from "../properties/properties.entity";

@ObjectType()
@Entity()
export class RequestItem extends StreamLineEntity {

    @ManyToMany(()=>Properties, properties => properties.requestItems)
    properties: Properties[]

}
