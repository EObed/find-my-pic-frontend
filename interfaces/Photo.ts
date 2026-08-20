export interface Photo {
    id?: string
    title?: string
    file: string
    preview?: string
}


export interface FrontEndImage {
    tempId: string
    file: File
    preview: string
}