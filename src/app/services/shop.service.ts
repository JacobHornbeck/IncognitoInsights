import { Injectable } from '@angular/core';
import { Content } from '../models/content.model';

import { Shop } from "../models/shop.model";
import { FilesystemService } from './filesystem.service';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class ShopService {
    shops: Shop[] = []

    constructor(private loadingService: LoadingService,
                private filesystem: FilesystemService) {
        this.filesystem.read('shops.json')
            .then((result: any) => {
                this.shops = JSON.parse(result.data)
            })
            .catch(async (error: any) => {
                console.log(error.message);
                if (error.message.includes('File does not exist')) {
                    console.log('Writing to file...');
                    await this.filesystem.write('shops.json', JSON.stringify(this.shops))
                        .then((result: any) => {
                            this.shops = JSON.parse(result.data);
                        })
                        .catch((error: any) => {
                            console.log(error.message);
                        })
                }
            })
    }

    private updateFile(shops: Shop[], loader: HTMLIonLoadingElement | null = null) {
        return this.filesystem.write('shops.json', JSON.stringify(this.shops))
            .then(async () => {
                if (loader) loader.dismiss()
                return await this.allShops
            })
            .catch((error: any) => {
                console.log(error.message);
            })
    }

    async saveShop(shop: Shop) {
        let loader = await this.loadingService.createInfiniteLoader('Creating shop...')
        this.shops.push(shop)
        return await this.updateFile(this.shops, loader)
    }

    async deleteShop(id: number) {
        let loader = await this.loadingService.createInfiniteLoader('Deleting shop...')
        this.shops = this.shops.filter((el, i) => i != id)
        return await this.updateFile(this.shops, loader)
    }

    async updateShopTitle(id: number, shopTitle: string) {
        let loader = await this.loadingService.createInfiniteLoader('Updating shop...')
        this.shops[id].title = shopTitle
        return await this.updateFile(this.shops, loader)
    }

    async updateShopData(id: number, shopData: Content[]) {
        this.shops[id].data = shopData
        return await this.updateFile(this.shops)
    }

    getShop(id: number) {
        return this.filesystem
            .read('shops.json')
            .then((result: any) => {
                return JSON.parse(result.data)[id]
            })
            .catch((error: any) => {
                console.log(error.message);
            })
    }

    async getAllShops() {
        return this.filesystem
            .read('shops.json')
            .then((result: any) => {
                let tempData = JSON.parse(result.data)

                return tempData.map((el: any) => {
                    return {
                        title: el.title,
                        date: new Date(el.date)
                    }
                })
            })
            .catch((error: any) => {
                console.log(error.message);
            })
    }

    get allShops() {
        return this.filesystem
            .read('shops.json')
            .then((result: any) => {
                let tempData = JSON.parse(result.data)

                return tempData.map((el: any) => {
                    return {
                        title: el.title,
                        date: new Date(el.date)
                    }
                })
            })
            .catch((error: any) => {
                console.log(error.message);
            })
                
    }
}
