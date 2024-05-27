import { HistoryDTO } from "../../model/DTO/HistoryDTO";

export interface HistoryRepositoryInterface {
  addHistoryEntry(history: HistoryDTO): Promise<void>;
}
