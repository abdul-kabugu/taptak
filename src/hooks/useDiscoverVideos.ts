/*import { useQuery } from "@apollo/client";
import { DISCOVER_VIDEOS } from "@/graphql/fragments/discoverVideos";
import { APP_ID } from "@/assets/constant";

export const useDiscoverVideos = () => {
    const {data, loading, error} = useQuery(DISCOVER_VIDEOS, {
        variables : {
            "where": {
                "metadata": {
                  "content": {
                    "path": [
                      "sources"
                    ],
                    "array_contains": [APP_ID]
                  }
                }
              }
        }
    })

    return {
        data,
        loading,
        error
    }
}*/


import { useQuery } from "@tanstack/react-query";



  export  const useDiscoverVideos =  ()  =>  {
     
    /*const fetchVideos =  async ()  =>  {
      const  data = await fetch("https://sapo-rdii.onrender.com/api/post/get-posts").then(res => {
        res.json()

        //https://sapo-rdii.onrender.com/api/post/get-posts
      }).catch(err  =>  {
        console.log("the error  while fetching", err)
      })

      console.log("the videos data", data)
      return data
    }*/


      const fetchVideos = async () => {
        try {
          const data = await fetch("https://sapo-rdii.onrender.com/api/post/get-posts")
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
      


      const {isLoading, data, error, isError}  = useQuery({queryKey : ["fetch-videos"], queryFn:  fetchVideos})

      return{
        data,
        isLoading,
        isError,
        error,
        fetchVideos
      }
  }