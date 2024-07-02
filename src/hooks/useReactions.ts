
import axios from "axios"
import {useState}  from 'react'



export const useReactions = ()  =>   {
  const [likeStatus, setlikeStatus] = useState(null)
  const [postLikesCount, setpostLikesCount] = useState(null)



    const handleLike = async (id : any, userId: any) => {
        let postEndPoint = `https://sapo-rdii.onrender.com/api/post/${id}/like`
  
  
        try {
              
          const result =  await  axios.post(postEndPoint, {
            userId : userId
          })
  
          console.log("reacted success", result)
  
          
        } catch (error) {
          alert("something went wrong")
          console.log("erroor", error)
        }
  
  
       
        
       }

       const isPostLiked = async (postId :any , userId: any) => {
        try {
          const data = await fetch(`https://sapo-rdii.onrender.com/api/post/ispost-liked/${postId}/${userId}`)
            .then(res => res.json())
            .catch(err => {
              console.log("the error while fetching", err);
              throw err;  // Re-throw the error to be caught in the outer try-catch
            });
      
          console.log("is user  liked this post ", data);
          setlikeStatus(data)
          return data;
        } catch (error) {
          console.log("the error while fetching", error);
          return null;  // Return null or an appropriate fallback value
        }
      };

      const postLikes = async (postId :any ) => {
        try {
          const data = await fetch(`https://sapo-rdii.onrender.com/api/post/post-likes/${postId}`)
            .then(res => res.json())
            .catch(err => {
              console.log("the error while fetching", err);
              throw err;  // Re-throw the error to be caught in the outer try-catch
            });
      
          console.log("is user  liked this post ", data);
          setpostLikesCount(data)
          return data;
        } catch (error) {
          console.log("the error while fetching", error);
          return null;  // Return null or an appropriate fallback value
        }
      };
      


      ///const {isLoading, data, error, isError}  = useQuery({queryKey : ["fetch-videos"], queryFn:  fetchVideos})


        const followUser  =  async (id: any , userId : any)  =>  {
          let userEndPoint = `https://sapo-rdii.onrender.com/api/auth/profile/${id}/follow`
  
  
          try {
                
            const result =  await  axios.post(userEndPoint, {
              userId : userId
            })
    
            console.log("reacted success", result)
    
            
          } catch (error) {
            alert("something went wrong")
            console.log("erroor", error)
          }
    
        }


       


       return {handleLike, isPostLiked, postLikes, likeStatus, postLikesCount, followUser}

}