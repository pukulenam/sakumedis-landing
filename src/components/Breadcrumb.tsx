import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="material-icons text-text-secondary-light dark:text-text-secondary-dark text-sm">
              chevron_right
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
