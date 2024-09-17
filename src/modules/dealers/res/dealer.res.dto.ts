import { ApiProperty } from '@nestjs/swagger';
import { UUID } from "typeorm/driver/mongodb/bson.typings";

import { DealerReqDto } from '../req/dealer.req.dto';

export class DealerResDto extends DealerReqDto {
    id: string;
}
