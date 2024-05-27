import axios from "axios";
import { HistoryRepositoryInterface } from "../interface/InterfaceRepository/HistoryREpositoryInterface";

interface SynonymResponse {
  meanings: {
    definitions: {
      synonyms: string[];
    }[];
  }[];
}

export class DictionaryService {
  private apiUrl: string;
  private historyInterface: HistoryRepositoryInterface;
  constructor() {
    this.apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
  }

  public async fetchWord(word: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar a palavra: ${error.message}`);
    }
  }

  public async fetchSynonyms(word: string): Promise<string[]> {
    try {
      const response = await axios.get<SynonymResponse[]>(
        `${this.apiUrl}/${word}`
      );
      const data = response.data;

      const synonyms: string[] = [];

      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          //
          meaning.definitions.forEach((definition) => {
            if (definition.synonyms) {
              synonyms.push(...definition.synonyms);
            }
          });
        });
      });

      return synonyms;
    } catch (error) {
      throw new Error(`Erro ao buscar definição: ${error.message}`);
    }
  }
}
