import {
    Users,
    Settings,
    SquarePen,
    LucideIcon
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active?: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    key: string;
    menus: Menu[];
  };
  
  export function getMenuList(key: string): Group[] {
    const menuList = [      
      {
        groupLabel: "Schedules",
        key: "op",
        menus: [
          {
            href: "/categories",
            label: "Management schedule",
            icon: SquarePen
          },
          {
            href: "/categories",
            label: "Staff schedule",
            icon: SquarePen
          },
          {
            href: "/categories",
            label: "Report schedule",
            icon: SquarePen
          },          
        ]
      },
      {
        groupLabel: "Users & Roles",
        key: "user",
        menus: [     
          {
            href: "",
            label: "Roles",
            icon: SquarePen,
            submenus: [
              {
                href: "/posts",
                label: "Role list"
              },
              {
                href: "/posts/new",
                label: "Establish roles"
              },
            ]
          },          
        ]
      },
      {
        groupLabel: "Master Data",
        key: "masterData",
        menus: [
          {
            href: "/regional-hierarchy/areas",
            label: "Regional Hierarchy",
            icon: Users
          },
          {
            href: "/users",
            label: "Location management",
            icon: Users
          },
          {
            href: "/users",
            label: "Establish reason",
            icon: Users
          },          
        ]
      },
      {
        groupLabel: "Settings",
        key: "settings",
        menus: [
          {
            href: "/users",
            label: "Users",
            icon: Users
          },
          {
            href: "/account",
            label: "Account",
            icon: Settings
          }
        ]
      }
    ];
    
    const res = menuList.filter(item => item.key === key);
    return res ?? [] ;
  }
  