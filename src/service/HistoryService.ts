import { HistoryRepositoryInterface } from "../interface/InterfaceRepository/HistoryREpositoryInterface";
import { HistoryDTO } from "../model/DTO/HistoryDTO";

export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepositoryInterface) {}

  public async addHistoryEntry(history: HistoryDTO): Promise<void> {
    await this.historyRepository.addHistoryEntry(history);
  }
}
