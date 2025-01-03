import { Separator } from "@radix-ui/react-separator";
import { ModeToggle } from "@/components/admin-panel/mode-toggle";
import { ScreenToggle } from "@/components/admin-panel/screen-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Footer } from "@/components/admin-panel/footer";

interface ContentLayoutProps {
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}

export function ContentLayout({ breadcrumb, children }: ContentLayoutProps) {
  return (
    <>
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumb}
          <div className="flex flex-1 items-center justify-end">
            <ScreenToggle />
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
        <Footer/>
    </>
  );
}
