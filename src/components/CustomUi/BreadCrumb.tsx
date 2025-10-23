"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbCollapsed() {
  const location = usePathname();

  const paths = location
    .split("/")
    .filter((p) => p)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <Breadcrumb className="mt-5">
      <BreadcrumbList>
        {paths.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                {item.replace(/-/g, " ")}
              </Link>
            </BreadcrumbLink>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
