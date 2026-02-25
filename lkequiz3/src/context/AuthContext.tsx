import { supabase } from "@/lib/supabase/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    profileImage?: string;
    onboardingCompleted?: boolean;
}

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const {
                data: {session},
            } = await supabase.auth.getSession();

            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id);
                setUser(profile);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking session", error);
            setUser(null);
        }
    }

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    const fetchUserProfile = async (userId: string): Promise<User | null> => {
        try {
            console.info("userId: " + userId);
            delay(5000).then(() => console.log('ran after 5 second1 passed'));

            const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();
            

            console.info("fetchUserProfile.data", data);
            console.info("fetchUserProfile.error", error);

            if (error) {
                console.error("Error fetching profile", error);
                return null;
            }
            if (!data) {
                console.error("No profile data returned");
                return null;
            }

            const authUser = await supabase.auth.getUser();
            if (!authUser.data.user) {
                console.error("No auth user found");
                return null;
            }

            return {
                id: data.id,
                name: data.name,
                username: data.username,
                email: authUser.data.user.email || "",
                profileImage: data.prfile_image_url,
                onboardingCompleted: data.onboarding_completed,
            }
        }catch (error) {
            console.error("Error in fetch user profile", error);
            return null;
        }
    }

    const signIn = async (email: string, password: string) => {
        // const {data, error} = await supabase.auth.signInWithPassword({
        //     email,
        //     password
        // } )
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.info("signIn.data", data);
        console.info("signIn.error", data);
        if (error) throw error;
        if (data.user){
            const profile = await fetchUserProfile(data.user.id);
            setUser(profile);
        } 
    }
    const signUp = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        } );
        console.info("signUp.data", data);
        console.info("signUp.error", data);
        if (error) throw error;
        if (data.user){
            const profile = await fetchUserProfile(data.user.id);

            console.info("signUp.profile", profile);
            setUser(profile);
        } 
    }
    const updateUser = async (userData: Partial<User>) => {
        if (!user) return;

        try {
            const updateData: any = {};
            if (userData.name !== undefined) updateData.name = userData.name;
            if (userData.username !== undefined) updateData.username = userData.username;
            if (userData.profileImage !== undefined) updateData.profile_image_url = userData.profileImage;
            if (userData.onboardingCompleted !== undefined) updateData.onboarding_completed = userData.onboardingCompleted;
            const {error} = await supabase.from("profiles").update(updateData).eq("id", user.id);
            if (error) throw error;
        } catch (error) {
            console.error("Error updating user", error);
            throw error;

        }

        // if (error) throw error;
        // if (data.user){
        //     console.log(data.user);
        // } 
    }

    return <AuthContext.Provider value={{user, signUp, updateUser, signIn}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("musit be inside the provider")
    }
    return context;
}