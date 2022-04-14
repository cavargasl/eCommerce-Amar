import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

const api = {
  list: async (): Promise<Product[]> => {
    return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQLB-UfMt8pvtoABa6vo33KQxiL8LYdH2YWZF4IllaVMAVSNYjcslIRldqQ9PmV0d9b2z5aX5Gm5eO3/pub?gid=0&single=true&output=csv',
    {
      responseType: "blob"
    }).then(response => {
      return new Promise<Product[]>((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: results => resolve(results.data as Product[]),
          error: error =>  reject(error.message)
        })
      })
    })
  }
}

export default api