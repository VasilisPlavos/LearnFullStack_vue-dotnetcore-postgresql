import axios from "axios";
import { ICustomer } from './../types/Customer';
import IServiceResponse from './../types/ServiceResponse.d';

export default class CustomerService {
    API_URL = process.env.VUE_APP_API_URL;

    public async createCustomer(customer: ICustomer):
      Promise<IServiceResponse<ICustomer>> {
        try {
            const result = await axios.post(`${this.API_URL}/customer`, customer);
            return result.data;
        } catch (error) {
            console.error('Error', error);
            return error;
        }
    }

    public async deleteCustomer(customerId: number): Promise<boolean> {
        try {
            const result = await axios.delete(`${this.API_URL}/customer/${customerId}`);
            return result.data;
        } catch (error) {
            console.error('Error', error);
            return error;
        }
    }

    public async getAllCustomers(): Promise<ICustomer[]> {
        try {
            const result = await axios.get(`${this.API_URL}/customers`);
            return result.data;
        } catch (error) {
            console.error('Error', error);
            return error;
        }
    }
}