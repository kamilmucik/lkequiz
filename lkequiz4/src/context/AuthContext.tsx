
// import { ownapi } from "@/lib/api/client";
import { ownapi } from "@/lib/api2/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface User {
    id: string ;
    userId?: string;
    fullname?: string | null;
    email?: string | null;
    username?: string | null;
    profileImage?: string | null;
    onboardingCompleted?: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const signOut = async () => {
        // await supabase.auth.signOut();
        setUser(null);
    };

    const checkSession = async () => {
        setIsLoading(true);

    //     try {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();

    //   if (session?.user) {
    //     const profile = await fetchUserProfile(session.user.id);
    //     setUser(profile);
    //   } else {
    //     setUser(null);
    //   }
    // } catch (error) {
    //   console.error("Error checking session:", error);
    //   setUser(null);
    // } finally {
      setIsLoading(false);
    // }
    }
    
    const fetchUserProfile = async (userId: string): Promise<User | null> => {
        try {

            console.info("fetchUserProfile.userId", userId);
            const {data, error} = await ownapi.profile.getDetails({userId});

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

            // const authUser = await supabase.auth.getUser();
            // if (!authUser.data.user) {
            //     console.error("No auth user found");
            //     return null;
            // }

            let profile: User = {
                id: data.id,
                userId: userId,
                fullname: data.fullname,
                username: data.username,
                // email: authUser.data.user.email || "",
                profileImage: data.profile_image_url,
                onboardingCompleted: data.onboarding_completed,
            };

            return profile;
        }catch (error) {
            console.error("Error in fetch user profile", error);
            return null;
        }
    }

    const signIn = async (email: string, password: string) => {
        const {data, error} = await ownapi.auth.signInWithPassword({email, password});
        console.info("signIn.data", data);
        if (error) throw error;
        if (data.user){
            console.info("signIn.data.user.id", data.user.id);
            const profile = await fetchUserProfile(data.user.id);
            console.info("signIn.profile", profile);
            setUser(profile);
            console.info("signIn.profile.user", user);
        } 
    }

    const signUp = async (email: string, password: string) => {
        const {data, error} = await ownapi.auth.signUp({
            email,
            password
        } );
        if (error) throw error;
        if (data.user){
            const profile = await fetchUserProfile(data.user.id);
            // console.info("signUp.profile", profile);
            setUser(profile);
        } 
    }
    const updateUser = async (userData: Partial<User>) => {
        if (!user) return;

        try {
            const updateData: any = {};
            if (userData.fullname !== undefined) 
                updateData.fullname = userData.fullname;
            // if (userData.userId !== undefined) 
                updateData.userId = user.userId;
            if (userData.username !== undefined) 
                updateData.username = userData.username;
            // if (userData.profileImage !== undefined) 
            //     updateData.profile_image_url = userData.profileImage;
            if (userData.onboardingCompleted !== undefined) 
                updateData.onboarding_complete = userData.onboardingCompleted;

            // console.info("updateUser.updateData", updateData);
            // console.info("updateUser.updateData", user);

            await ownapi.profile.updateUser({userId: updateData.userId, userData: updateData});
            // const {error} = await ownapi.user.updateUser({userId: user.userId, userData: updateData});
            // const {error} = await supabase.from("profiles").update(updateData).eq("id", user.id);
            // if (error) throw error;
            const profile = await fetchUserProfile(user.id);
            // console.info("signUp.profile", profile);
            setUser(profile);       


        } catch (error) {
            console.error("Error updating user", error);
            throw error;
        }
    }

    const logout =  () => {

    }

    return <AuthContext.Provider value={{user, signUp, updateUser, signOut, signIn, isLoading}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("musit be inside the provider")
    }
    return context;
}