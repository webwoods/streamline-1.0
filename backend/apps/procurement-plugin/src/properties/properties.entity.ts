import { StreamLineEntity } from "@libs/core/entities/streamline.entity";
import { RequestItem } from "../requestItem/requestItem.entity";

@ObjectType()
@Entity()
export class Properties extends StreamLineEntity{

    key: string;8
    
    value: string;

    type: string;

    @ManyToMany(() => RequestItem, requestItem => requestItem.properties)
    requestItems: RequestItem[];

}
