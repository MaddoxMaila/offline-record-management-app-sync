import { randomUUID } from "crypto";
import {UploadedFile} from "express-fileupload";

const newFileName = (fileName: string): string => {
    
    return `${randomUUID()}.${fileExt(fileName)}`
}

const fileExt = (fileName: string): string => {
    const name = fileName.split(".")
    return name[name.length - 1]
}

export const saveArtwork = async (artworkFile: UploadedFile) => {
    /**
     * @description
     * Move artwork file and then create a url for the file in the server
     * @param
     *      artworkFile: UploadedFile - file to be moved in the server
     */
    try {
        artworkFile.name = newFileName(artworkFile.name)

        const PATH: string = process.env.ARTWORK_PATH || './public/artwork'

        await artworkFile.mv(`${PATH}/${artworkFile.name}`)

        return `/public/artwork/${artworkFile.name}`
        
    } catch (e: any) {
        return null
    }

}

export const saveAudio = async (audioFile: UploadedFile) => {
    /**
     * @description
     * Move audio file and then create a url for the file in the server
     * @param
     *      audioFile: UploadedFile - file to be moved in the server
     */
    try {
        audioFile.name = newFileName(audioFile.name)

        const PATH: string = process.env.AUDIO_PATH || './public/audios'
        
        await audioFile.mv(`${PATH}/${audioFile.name}`)

        return `/public/artwork/${audioFile.name}`

    } catch (e: any) {
        return null
    }

}

export const isAllowedFile = (file: UploadedFile | UploadedFile[]) => {
    
    if(Array.isArray(file)) return false

    const ext: string = fileExt(file.name)

    return ext === "jpeg" || ext === "jpg" || ext === 'png' || ext === 'webm' || ext === 'mp3' || ext === 'm4a' || ext === 'flac'

}


 