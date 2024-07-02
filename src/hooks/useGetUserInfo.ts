
import { useQuery } from "@tanstack/react-query";



  export  const useGetUserInfo =  (id: any)  =>  {
     

      const fetchUser = async () => {
        try {
          const data = await fetch(`https://sapo-rdii.onrender.com/api/auth/profile/${id}`)
            .then(res => res.json())
            .catch(err => {
              console.log("the error while fetching", err);
              throw err;  // Re-throw the error to be caught in the outer try-catch
            });
      
          console.log("the videos data", data);
          return data;
        } catch (error) {
          console.log("the error while fetching", error);
          return null;  // Return null or an appropriate fallback value
        }
      };
      


      const {isLoading, data, error, isError,}  = useQuery({queryKey : ["fetch-user-by-id"], queryFn:  fetchUser})

      return{
        data,
        isLoading,
        isError,
        error,
        fetchUser,
    
      }
  }