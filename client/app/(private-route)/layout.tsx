import { auth } from "@/auth";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { redirect } from "next/navigation";

export default async function ViewLayout({ children }: { children: React.ReactNode }) {    
    const session = await auth()
    if(!session) return redirect('/login') 
    return(
        <AdminPanelLayout>{children}</AdminPanelLayout>
    )
};