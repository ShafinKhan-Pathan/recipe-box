import { openDB } from "idb";


const DB_NAME = "recipe-box-db";
const STORE_NAME = "images";
// This helps to create a store if the first time it doesnt exist
const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME)
        }
    }
})

// Now let's save image to the DB

export async function saveImageToDB(file: File): Promise<string> {
    const db = await dbPromise
    const imageId = crypto.randomUUID()
    await db.put(STORE_NAME, file, imageId)
    return imageId
}

// Getting an image file from the DB that we created just now

export async function getImageFromDB(imageId: string): Promise<Blob | undefined> {
    const db = await dbPromise
    return db.get(STORE_NAME, imageId)

}

// Deleting image from DB to prevent storage
export async function deleteImageFromDB(imageId: string): Promise<void> {
    const db = await dbPromise
    return db.delete(STORE_NAME, imageId)
}

