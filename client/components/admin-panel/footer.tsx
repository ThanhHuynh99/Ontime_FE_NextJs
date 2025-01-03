import Link from "next/link";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="z-20 sticky bottom-0 flex justify-between w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
        Powered by{" "}
          <Link
            href="https://eznet.com.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Ez Net Technology Co. Ltd
          </Link>
          .
        </p>
      </div>
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
        {year} &#169; Copyright by {" "}
          <Link
            href="https://eznet.com.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Ez Net Technologies
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
