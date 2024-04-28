import { Client, ID, Query, Databases, Storage } from "appwrite";
import config from "../config/config";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId,}) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          
          
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Create Post :: Error ::", error);
      throw error
    }
  }

  async updatePost( slug, { title, content,  featuredImage,  }) {
    try {
       this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          slug,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("updatepost  error ", error);
    }
  }

  async deletePost( slug ) {
    try {
      this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      
      );
      return true;
    } catch (error) {
      console.log("updatepost  error ", error);
    }
  } 

  
  async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
}

async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
            

        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
}

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false
    }
}

  async deletePost (fileId){
    try {
        return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId, 
        
          )
    } catch (error) {
         console.log(error)
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}

  
}
 const services=new Services();
 export default services;