import { Client, Account, ID} from 'appwrite'
import config from '../config/config'

 

export class AuthServices{
    
    client;
    account;

    constructor() {
        this.client = new Client();
        this.client.setEndpoint(config.appwriteUrl) // Your API Endpoint
                   .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({email, password, userName}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, userName)
            if(userAccount) return this.login({email, password})
            else return userAccount
        } catch (error) {
            throw error
        }}

    async login ({email, password}){
      try {
        return  await this.account.createEmailSession(email, password);

      } catch (error) {
         throw error;
      }
    }

    async getCurrentuser(){
        try {
            return  await  this.account.get();
            
        } catch (error) {
            throw error
        }


    }

    async logout (){
        try{
            this.account.deleteSessions();

        } catch (error){
throw error
        }
    }



}

const  authService= new AuthServices();
export default authService;