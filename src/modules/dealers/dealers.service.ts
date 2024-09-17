import { Injectable } from "@nestjs/common";
import { DealerRepositoty } from "../repository/services/dealerRepositoty";
import { DealerReqDto } from "./req/dealer.req.dto";
import { DealerResDto } from "./res/dealer.res.dto";


@Injectable()
export class DealerService {
  constructor(

    private readonly dealerRepository: DealerRepositoty,
  ) {}

  public async createDealer(dto: DealerReqDto): Promise<DealerResDto> {
    const dealership = this.dealerRepository.create(dto);
    return this.dealerRepository.save(dealership);
  }

  public async getDealers(): Promise<DealerResDto[]> {
    return this.dealerRepository.find();
  }

  public async getDealerById(id: string): Promise<DealerResDto> {
    return this.dealerRepository.findOneBy({ id });
  }

  public async deleteDealership(id: string): Promise<void> {
    await this.dealerRepository.delete(id);
  }


}
