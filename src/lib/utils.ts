import { assets } from "../data/mockData";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface RouteMeta {
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const routeMetadata = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Monitor asset inventory, service workload, and operational activity.",
    breadcrumb: "Dashboard",
  },
  assets: {
    title: "Assets",
    subtitle: "Review inventory records, lifecycle status, and device ownership.",
    breadcrumb: "Assets",
  },
  assetDetail: {
    title: "Asset Detail",
    subtitle: "Inspect device history, assignment details, and service activity.",
    breadcrumb: "Asset Detail",
  },
  employees: {
    title: "Employees",
    subtitle: "Track device ownership and support coverage across departments.",
    breadcrumb: "Employees",
  },
  assignments: {
    title: "Assignments",
    subtitle: "Manage allocations, pending returns, and assignment history.",
    breadcrumb: "Assignments",
  },
  maintenance: {
    title: "Maintenance",
    subtitle: "Follow repair intake, vendor handling, and return timelines.",
    breadcrumb: "Maintenance",
  },
  requests: {
    title: "Requests",
    subtitle: "Review internal service requests for hardware, access, and support.",
    breadcrumb: "Requests",
  },
  vendors: {
    title: "Vendors",
    subtitle: "Manage suppliers, service partners, and contract relationships.",
    breadcrumb: "Vendors",
  },
  reports: {
    title: "Reports",
    subtitle: "Analyze inventory, assignments, repairs, and warranty outlooks.",
    breadcrumb: "Reports",
  },
  settings: {
    title: "Settings",
    subtitle: "Configure organization preferences, roles, and workflow defaults.",
    breadcrumb: "Settings",
  },
  notFound: {
    title: "Page Not Found",
    subtitle: "The route you requested is unavailable in this workspace.",
    breadcrumb: "Not Found",
  },
} satisfies Record<string, RouteMeta>;

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function resolveAssetLabel(segment: string) {
  const normalizedSegment = decodeURIComponent(segment);
  const matchedAsset = assets.find(
    (asset) =>
      asset.id.toLowerCase() === normalizedSegment.toLowerCase() ||
      asset.assetTag.toLowerCase() === normalizedSegment.toLowerCase(),
  );

  if (matchedAsset) {
    return {
      title: matchedAsset.assetTag,
      subtitle: `${matchedAsset.type} · ${matchedAsset.brand} ${matchedAsset.model}`,
      breadcrumb: matchedAsset.assetTag,
    } satisfies RouteMeta;
  }

  return routeMetadata.assetDetail;
}

export function getRouteMeta(pathname: string): RouteMeta {
  if (pathname === "/" || pathname === "/dashboard") {
    return routeMetadata.dashboard;
  }

  if (pathname === "/assets") {
    return routeMetadata.assets;
  }

  if (pathname.startsWith("/assets/")) {
    const [, , assetSegment] = pathname.split("/");
    return resolveAssetLabel(assetSegment ?? "");
  }

  if (pathname === "/employees") {
    return routeMetadata.employees;
  }

  if (pathname === "/assignments") {
    return routeMetadata.assignments;
  }

  if (pathname === "/maintenance") {
    return routeMetadata.maintenance;
  }

  if (pathname === "/requests") {
    return routeMetadata.requests;
  }

  if (pathname === "/vendors") {
    return routeMetadata.vendors;
  }

  if (pathname === "/reports") {
    return routeMetadata.reports;
  }

  if (pathname === "/settings") {
    return routeMetadata.settings;
  }

  return routeMetadata.notFound;
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/" || pathname === "/dashboard") {
    return [{ label: routeMetadata.dashboard.breadcrumb }];
  }

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    if (currentPath === "/assets" && !isLast) {
      breadcrumbs.push({ label: routeMetadata.assets.breadcrumb, to: "/assets" });
      return;
    }

    if (currentPath.startsWith("/assets/")) {
      const assetMeta = resolveAssetLabel(segment);
      breadcrumbs.push({
        label: assetMeta.breadcrumb,
      });
      return;
    }

    const meta = getRouteMeta(currentPath);
    breadcrumbs.push({
      label: meta.breadcrumb || formatSegmentLabel(segment),
      to: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs.length > 0 ? breadcrumbs : [{ label: routeMetadata.notFound.breadcrumb }];
}

export function getUserInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
