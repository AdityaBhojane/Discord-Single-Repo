import axiosConfig from "../../config/axiosConfig"



export const updateCategory = async ({ id, name, token }: { id: string, name: string, token: string }) => {
    try {
        const response = await axiosConfig.put(`/category/${id}`, {
            name
        }, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const deleteCategory = async ({ id, token }: { id: string, token: string }) => {
    try {
        const response = await axiosConfig.delete(`/category/${id}`, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const createCategoryRequest = async ({ token, name, serverId }: { token: string, name: string, serverId: string }) => {
    try {
        const response = await axiosConfig.put(`/servers/${serverId}/categories`, {
            categoryName: name
        },{
            headers: {
                "x-access-token": token
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}