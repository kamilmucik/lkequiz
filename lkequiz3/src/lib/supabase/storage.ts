import {File} from 'expo-file-system';
import { supabase } from './client';

export const uploadProfileImage = async (userId: string, imageUri: string) => {

    try {
        const fileExtention = imageUri.split(".").pop() || "jpg";
        const fileName = `${userId}/profile.${fileExtention}`;
        const file = new File(imageUri);
        const bytes = await file.bytes();

        const {error} = await supabase.storage.from('profiles').upload(fileName,bytes, {
            contentType: `image/${fileExtention}`,
            upsert: true,

        });
        if (error){
            throw error;
        }

        const {data: urlData} = supabase.storage
                .from("profiles")
                .getPublicUrl(fileName);
        return urlData.publicUrl;
    } catch (error) {
        console.error("Error upload profile image",error);
        throw error;
    }
}