export interface Media {
    _id: string;
    author: string;
    fileType: string;
    filePath: string;
    projectName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SasURL {
    url: string;
}