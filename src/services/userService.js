import { apiClient } from "./apiClient"

export const registerUser = async (userData) => {
    try{
        const response = await apiClient.post("/users/register", userData);
        const {message, data} = response.data;
    
        return {
            message,
            user: {
                fullName: data.fullName,
                email: data.email,
                id: data._id,
            },
        };
    }catch (error){
        throw error.response?.data?.message || "Registration Failed"
    }
};

export const loginUser = async (credentials) => {
    try{
        const response = await apiClient.post("/users/login", credentials);
        const {message, token, userFound} = response.data;
    
        return {
            message,
            token,
            user: {
                fullName: userFound.fullName,
                email: userFound.email,
                id: userFound._id,
            },
        };
    }catch (error){
        throw error.response?.data?.message || "Login Failed"
    }
};

export const getBrands =  async () => {
    try{
        const response = await  apiClient.get("/brands");
        const {success, brands} = response.data
        const normalizedBrands = brands.map((brand) => ({
            ...brand,
            name: brand.name,
            id: brand._id,
          }));
      
          return {normalizedBrands, success};
    }catch(error){
        console.error("Error fetching brands:", error);
         throw error;
    }
};

export const getCategories =  async () => {
    try{
        const response = await  apiClient.get("/categories");
        return response.data
    }catch(error){
        console.error("Error fetching categories:", error);
         throw error;
    }
};

export const getProducts =  async () => {
    try{
        const response = await  apiClient.get("/products");
        return response.data
    }catch(error){
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getReviews =  async () => {
    try{
        const response = await  apiClient.get("/reviews");
        return response.data
    }catch(error){
        console.error("Error fetching reviews:", error);
         throw error;
    }
};

export const getColors =  async () => {
    try{
        const response = await  apiClient.get("/colors");
        return response.data
    }catch(error){
        console.error("Error fetching colors:", error);
         throw error;
    }
};