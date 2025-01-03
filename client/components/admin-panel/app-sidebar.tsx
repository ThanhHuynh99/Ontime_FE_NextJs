"use client"

import * as React from "react"
import { LayoutDashboard, Command, FolderGit2, CircleUser, ServerCog, Wrench, Settings ,Palette } from "lucide-react"

import { NavUser } from "@/components/admin-panel/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { Menu } from "./menu"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ThemeSelector } from "./theme-selector"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      keyof: "dashboard",
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: "Operates",
      url: "javascript:void(0)",
      keyof: "op",
      icon: ServerCog,
      isActive: false,
    },
    {
      title: "Users & Roles",
      url: "javascript:void(0)",
      keyof: "users",
      icon: CircleUser,
      isActive: false,
    },
    {
      title: "Reports & Data",
      url: "javascript:void(0)",
      keyof: "report",
      icon: FolderGit2,
      isActive: false,
    },
    {
      title: "Setups",
      url: "javascript:void(0)",
      keyof: "masterData",
      icon: Wrench,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/settings",
      keyof: "settings",
      icon: Settings,
      isActive: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()
  const router = useRouter()
  
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-white">
                    <Command className="size-4" />
                  </div>                  
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}                      
                      onClick={() => {
                        setActiveItem(item);                        
                        if(item.title == "Dashboard" || item.title == "Settings"){
                          setOpen(false);
                          router.push(item.url);
                        }else{
                          setOpen(true);
                        }
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Palette/>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="right">
              <ThemeSelector/>
            </PopoverContent>
          </Popover>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>            
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
        <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <Menu keyof={activeItem.keyof}/>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
