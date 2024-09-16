import { Injectable, NotFoundException } from '@nestjs/common';


import { ModelRepository } from '../repository/services/modelRepositoty';


@Injectable()
export class ModelsService {
  constructor(private readonly modelRepository: ModelRepository) {}
}
