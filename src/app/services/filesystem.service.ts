import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

@Injectable({ providedIn: 'root' })
export class FilesystemService {
    constructor() {}

    async read(path: string) {
        return await Filesystem.readFile({
            path: path,
            directory: Directory.Data,
            encoding: Encoding.UTF8
        })
    }

    async write(path: string, data: string) {
        return await Filesystem.writeFile({
            path: path,
            directory: Directory.Data,
            encoding: Encoding.UTF8,
            data: data,
        })
    }

    
}
