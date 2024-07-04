//@ts-nocheck

import axios from "axios";
import { livepeer } from "@/assets/constant";
import { TranscodeProfileEncoder, TranscodeProfileProfile, Type } from "livepeer/models/components"
//import tus from 'tus-js-client'
var tus = require('tus-js-client')
import {useState} from 'react'
import { useSetState } from "react-use";



export  const  usePinToLivepeer =  ()  =>  {

    const [isUploadError, setisUploadError] = useState(false)
    const [uploadingErrorMessage, setuploadingErrorMessage] = useState()
    const [progress, setprogress] = useState()
    const [isUploaded, setisUploaded] = useState(false)
const [uploadedUrl, setuploadedUrl] = useState()
const [isGeneratingUrlError, setisGeneratingUrlError] = useState(false)
const [videoPlaybackId, setvideoPlaybackId] = useState("")
const [isLoading, setisLoading] = useState(false)


 const getEndPointUrl =  async ()  =>  {
try {
       const result = await livepeer.asset.create({
                name: "filename.mp4",
                staticMp4: true,
                playbackPolicy: {
                  type: Type.Public,
                  //webhookId: "1bde4o2i6xycudoy",
                  webhookContext: {
                    "streamerId": "my-custom-id",
                  },
                  refreshInterval: 600,
                },
                profiles: [
                  {
                    width: 1280,
                    name: "720p",
                    bitrate: 3000000,
                    quality: 23,
                    fps: 30,
                    fpsDen: 1,
                    gop: "2",
                    profile: TranscodeProfileProfile.H264Baseline,
                    encoder: TranscodeProfileEncoder.H264,
                  },
                ],
              });
            
              // Handle the result
             // console.log("the  results of  fn",result)
              console.log("the  playbackId", result.data?.asset.playbackId)
              setvideoPlaybackId(result.data?.asset.playbackId)

           return result
            
        
    } catch (error) {
        console.log("the  error creating url", error)
        setisGeneratingUrlError(true)
    }

}
  //  UPLOAD  FILE 

const  uploadertoTus =  async (file : any)  =>  {
    setisLoading(true)
    const theResult = await getEndPointUrl()
    console.log("called in oher  fn", theResult?.data?.tusEndpoint)


   // Create a new tus upload

    const upload = new tus.Upload(file, {
      endpoint: theResult?.data?.tusEndpoint,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: function (error) {
        console.log('Failed because: ' + error)
        setisUploadError(true)
        setuploadingErrorMessage(error)
        setisLoading(false)
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
        console.log(bytesUploaded, bytesTotal, percentage + '%')
        setprogress(percentage )
      },
      onSuccess: function () {
        console.log('Download %s from %s', upload.file.name, upload.url)
        setisUploaded(true)
        setuploadedUrl(upload.url)
        setisLoading(false)
      },
    })
  
    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }
  
      // Start the upload
      upload.start()
    })
  }




return {
    getEndPointUrl,
    uploadertoTus,
    videoPlaybackId,
    progress,
    isUploaded,
    uploadedUrl,
    isLoading


}
}