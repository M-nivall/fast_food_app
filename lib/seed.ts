import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string) {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

async function clearStorage() {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );
}

async function seed(): Promise<void> {
  try {
    console.log("🧹 Clearing database...");
    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationCollectionId);
    await clearAll(appwriteConfig.menuCollectionId);
    await clearAll(appwriteConfig.menuCustomizationCollectionId);
    await clearStorage();

    // 1️⃣ Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        ID.unique(),
        cat
      );
      categoryMap[cat.name] = doc.$id;
    }

    // 2️⃣ Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.customizationCollectionId,
        ID.unique(),
        cus
      );
      customizationMap[cus.name] = doc.$id;
    }

    // 3️⃣ Create Menu Items (directly use image_url)
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: item.image_url, // ✅ no re-upload
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: categoryMap[item.category_name],
        }
      );

      menuMap[item.name] = doc.$id;

      // 4️⃣ Create Menu Customizations
      for (const cusName of item.customizations) {
        const customizationId = customizationMap[cusName];
        if (!customizationId) continue;

        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCustomizationCollectionId,
          ID.unique(),
          {
            menu: doc.$id,
            customizations: customizationId,
          }
        );
      }
    }

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Failed to seed database:", error);
  }
}

export default seed;
