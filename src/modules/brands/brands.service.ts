import { Injectable } from '@nestjs/common';

import { ModelRepository } from '../repository/services/modelRepositoty';

@Injectable()
export class BrandsService {
  constructor(private readonly modelRepository: ModelRepository) {}
}
