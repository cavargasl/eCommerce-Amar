import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

const formatPrice = (price: number): number => {
  return Number(price.toString().replace(/[^0-9.]+/g, ""))
}

const api = {
  list: async (): Promise<Product[]> => {
    return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQLB-UfMt8pvtoABa6vo33KQxiL8LYdH2YWZF4IllaVMAVSNYjcslIRldqQ9PmV0d9b2z5aX5Gm5eO3/pub?gid=0&single=true&output=csv',
    {
      responseType: "blob"
    }).then(response => {
      return new Promise<Product[]>((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: results => {
            const products = results.data as Product[]
            return resolve(products.map(product => ({
              ...product,
              price: formatPrice(product.price)
            })))
          },
          error: error =>  reject(error.message)
        })
      })
    })
  }
}

export default api